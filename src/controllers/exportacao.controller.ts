import express, { Request, Response } from 'express';
import { gerarExcel, gerarPDF } from '../services/exportacao.service';
import { getRelatorioMensalData } from '../services/relatorio.service';

const router = express.Router();

router.get('/exportar/excel', async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { congregacaoId, mes, ano } = req.query;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    if (!congregacaoId || !mes || !ano) {
      res.status(400).json({ error: 'Parâmetros congregacaoId, mes e ano são obrigatórios.' });
      return;
    }
    const dados = await getRelatorioMensalData(
      schema,
      String(congregacaoId),
      String(mes),
      String(ano)
    );
    const buffer = await gerarExcel(dados.listaDizimistas, 'Dizimistas');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

router.get('/exportar/pdf', async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    const { congregacaoId, mes, ano } = req.query;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    if (!congregacaoId || !mes || !ano) {
      res.status(400).json({ error: 'Parâmetros congregacaoId, mes e ano são obrigatórios.' });
      return;
    }
    const dados = await getRelatorioMensalData(
      schema,
      String(congregacaoId),
      String(mes),
      String(ano)
    );
    const buffer = await gerarPDF(dados.listaDizimistas, 'Dizimistas');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

export default router;