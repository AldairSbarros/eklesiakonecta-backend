import { getPrisma } from "../utils/prismaDynamic";

// Cria um novo usuário
export const createUsuario = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.usuario.create({ data });
};

// Busca usuário pelo e-mail
export const findUsuarioByEmail = async (schema: string, email: string) => {
  const prisma = getPrisma(schema);
  return prisma.usuario.findUnique({
    where: { email }
  });
};