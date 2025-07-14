import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import bcrypt from "bcrypt";
import { logAuditoria } from "../utils/logger";

// Prisma global (schema público)
const prismaGlobal = new PrismaClient();

// Cria um novo schema no PostgreSQL
async function criarSchema(nomeSchema: string) {
  await prismaGlobal.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${nomeSchema}"`);
}

// Roda as migrations do Prisma no novo schema
function rodarMigrationsNoSchema(schema: string) {
  const dbUrl = process.env.DATABASE_URL!.replace(/schema=([a-zA-Z0-9_]+)/, `schema=${schema}`);
  execSync(`npx prisma migrate deploy`, {
    env: { ...process.env, DATABASE_URL: dbUrl }
  });
}

// Cria o usuário admin no novo schema
async function criarAdminNoSchema({ nome, email, senha, schema }: { nome: string, email: string, senha: string, schema: string }) {
  const { PrismaClient: PrismaTenant } = require("@prisma/client");
  const dbUrl = process.env.DATABASE_URL!.replace(/schema=([a-zA-Z0-9_]+)/, `schema=${schema}`);
  const prismaTenant = new PrismaTenant({
    datasources: {
      db: { url: dbUrl }
    }
  });
  await prismaTenant.usuario.create({
    data: {
      nome,
      email,
      senha,
      perfil: "ADMIN",
      ativo: true
    }
  });
  await prismaTenant.$disconnect();
}

// Função utilitária para validar campos obrigatórios
function validarCamposObrigatorios(data: { nome?: string; email?: string }) {
  const erros: string[] = [];
  if (!data.nome || data.nome.trim() === "") erros.push("Nome é obrigatório.");
  if (!data.email || data.email.trim() === "")
    erros.push("E-mail é obrigatório.");
  return erros;
}

// Criação de igreja multi-tenant por schema
export const createChurch = async (data: any) => {
  const erros = validarCamposObrigatorios(data);
  if (erros.length > 0) {
    throw new Error(erros.join(" "));
  }
  if (data.password && data.password.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }
  const senhaParaSalvar = await bcrypt.hash(data.password || "defaultPassword", 10);
  const nomeSchema = `igreja_${Date.now()}`;

  try {
    await criarSchema(nomeSchema);
    rodarMigrationsNoSchema(nomeSchema);
    await criarAdminNoSchema({
      nome: data.nome,
      email: data.email,
      senha: senhaParaSalvar,
      schema: nomeSchema
    });
  } catch (error: any) {
    throw new Error("Erro ao criar schema ou rodar migrations: " + error.message);
  }

  try {
    const novaIgreja = await prismaGlobal.church.create({
      data: {
        nome: data.nome,
        email: data.email,
        password: senhaParaSalvar,
        schema: nomeSchema,
        status: data.status || "ativa",
      },
    });
    logAuditoria("Cadastro de igreja", { nome: data.nome, email: data.email });
    return novaIgreja;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("E-mail já cadastrado.");
    }
    throw new Error("Erro ao cadastrar igreja: " + error.message);
  }
};

// Exemplo de função para obter PrismaClient do schema correto
export function getPrismaTenant(schema: string) {
  const { PrismaClient: PrismaTenant } = require("@prisma/client");
  const dbUrl = process.env.DATABASE_URL!.replace(/schema=([a-zA-Z0-9_]+)/, `schema=${schema}`);
  return new PrismaTenant({
    datasources: {
      db: { url: dbUrl }
    }
  });
}

// As funções listChurches, getChurch, updateChurch, deleteChurch continuam usando prismaGlobal
export const listChurches = async () => {
  try {
    return await prismaGlobal.church.findMany();
  } catch (error: any) {
    throw new Error("Erro ao listar igrejas: " + error.message);
  }
};

export const getChurch = async (id: number) => {
  try {
    const igreja = await prismaGlobal.church.findUnique({ where: { id } });
    if (!igreja) {
      throw new Error("Igreja não encontrada.");
    }
    return igreja;
  } catch (error: any) {
    throw new Error("Erro ao buscar igreja: " + error.message);
  }
};

export const updateChurch = async (id: number, data: any) => {
  const erros = validarCamposObrigatorios(data);
  if (erros.length > 0) {
    throw new Error(erros.join(" "));
  }
  let dadosParaAtualizar = { ...data };
  if (data.password) {
    if (data.password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
    dadosParaAtualizar.password = await bcrypt.hash(data.password, 10);
  }

  try {
    const igreja = await prismaGlobal.church.update({
      where: { id },
      data: dadosParaAtualizar,
    });
    logAuditoria("Atualização de igreja", {
      id,
      camposAtualizados: Object.keys(dadosParaAtualizar),
    });
    return igreja;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Igreja não encontrada para atualização.");
    }
    if (error.code === "P2002") {
      throw new Error("E-mail já cadastrado.");
    }
    throw new Error("Erro ao atualizar igreja: " + error.message);
  }
};

export const deleteChurch = async (id: number) => {
  try {
    await prismaGlobal.church.delete({
      where: { id },
    });
    logAuditoria("Remoção de igreja", { id });
    return;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("Igreja não encontrada para remoção.");
    }
    throw new Error("Erro ao remover igreja: " + error.message);
  }
};