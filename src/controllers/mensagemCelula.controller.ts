import { Request, Response } from 'express';
import * as mensagemCelulaService from '../services/mensagemCelula.service';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

// CRUD no banco
export const criarMensagem = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const mensagem = await mensagemCelulaService.criarMensagem(schema, req.body);
    res.status(201).json(mensagem);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listarMensagens = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const mensagens = await mensagemCelulaService.listarMensagens(schema);
    res.json(mensagens);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obterMensagem = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const mensagem = await mensagemCelulaService.obterMensagem(schema, Number(id));
    if (!mensagem) return res.status(404).json({ error: 'Mensagem não encontrada.' });
    res.json(mensagem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizarMensagem = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const mensagem = await mensagemCelulaService.atualizarMensagem(schema, Number(id), req.body);
    res.json(mensagem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removerMensagem = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await mensagemCelulaService.removerMensagem(schema, Number(id));
    res.json({ message: 'Mensagem removida com sucesso.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Listar PDFs (mantendo sua lógica original)
export const listarMensagensPDF = async (req: Request, res: Response): Promise<void> => {
  const pdfsDir = path.join(__dirname, '../../public/pdfs');
  try {
    if (!fs.existsSync(pdfsDir)) {
      res.json([]);
      return;
    }

    type MensagemArquivo = {
      nome: string;
      caminho: string;
      data: Date;
      titulo?: string;
    };

    const files: MensagemArquivo[] = fs.readdirSync(pdfsDir)
      .filter(f => f.endsWith('.pdf'))
      .map(f => ({
        nome: f,
        caminho: `/pdfs/${f}`,
        data: fs.statSync(path.join(pdfsDir, f)).mtime,
        titulo: '',
      }));

    files.sort((a, b) => b.data.getTime() - a.data.getTime());

    for (const file of files) {
      const dataBuffer = fs.readFileSync(path.join(pdfsDir, file.nome));
      try {
        const pdfData = await pdfParse(dataBuffer);
        const linhas = pdfData.text ? pdfData.text.split('\n').filter(l => l.trim() !== '') : [];
        file.titulo = pdfData.info?.Title || (linhas[6] ? linhas[6].slice(0, 60) : file.nome);
      } catch (e) {
        console.error('Erro ao ler PDF:', file.nome, e);
        file.titulo = file.nome;
      }
    }

    res.json(files);
  } catch (err) {
    console.error('Erro ao listar mensagens:', err);
    res.status(500).json({ error: 'Erro ao listar mensagens.' });
  }
};