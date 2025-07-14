import * as relatorioService from '../services/relatorioCelula.service';
import { Request, Response, NextFunction } from 'express';

export const relatorioCompleto = async (req: Request, res: Response, next: NextFunction) => {
  const schema = req.headers['schema'] as string;
  if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

  const { celulaId } = req.params;
  let { mes, ano } = req.query;

  // Valores padrão: mês e ano atuais
  const now = new Date();
  const mesNum = mes ? Number(mes) : now.getMonth() + 1;
  const anoNum = ano ? Number(ano) : now.getFullYear();

  try {
    const membros = await relatorioService.membrosDaCelula(schema, Number(celulaId));
    const presencas = await relatorioService.presencasPorReuniao(schema, Number(celulaId));
    const media = await relatorioService.mediaPresencaNoMes(schema, Number(celulaId), mesNum, anoNum);
    const ranking = await relatorioService.rankingPresenca(schema, Number(celulaId), mesNum, anoNum);
    const aniversariantes = await relatorioService.aniversariantesDoMes(schema, Number(celulaId), mesNum);
    res.json({ membros, presencas, media, ranking, aniversariantes });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const relatorioPresenca = async (req: Request, res: Response, next: NextFunction) => {
  const schema = req.headers['schema'] as string;
  if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

  const { celulaId } = req.params;
  try {
    const presencas = await relatorioService.presencasPorReuniao(schema, Number(celulaId));
    res.json(presencas);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  } 
};