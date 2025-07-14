import { getPrisma } from "../utils/prismaDynamic";

export async function registrarLog(
  schema: string,
  {
    usuarioId,
    acao,
    detalhes,
    ip
  }: {
    usuarioId?: number;
    acao: string;
    detalhes?: string;
    ip?: string;
  }
) {
  const prisma = getPrisma(schema);
  await prisma.logAcesso.create({
    data: { usuarioId, acao, detalhes, ip }
  });
}

///////================MOCK==================////////

export function relatorioMensal(relatorioMensal: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Function not implemented.');
}
export function relatorioMensalPDF(relatorioMensalPDF: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Function not implemented.');
}

import { Request, Response } from 'express';

export async function relatorioCelulas(req: Request, res: Response) {
  return res.status(200).json({ message: 'Relatório de células OK' });
}

export async function relatorioFinanceiro(req: Request, res: Response) {
  return res.status(200).json({ message: 'Relatório financeiro OK' });
}

export async function relatorioDiscipuladoPorDiscipulador(req: Request, res: Response) {
  return res.status(200).json({ message: 'Relatório de discipulado OK' });
}

