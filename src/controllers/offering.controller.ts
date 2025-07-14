import { Request, Response } from 'express';
import * as offeringService from '../services/offering.service';
import fs from 'fs';
import path from 'path';

// CREATE
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('BODY RECEBIDO:', req.body)
    const schema = req.headers['schema'] as string;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    // Aceita os campos do seu teste
    const { valor, data, memberId, type, service, receiptPhoto, numeroRecibo, congregacaoId } = req.body;

    // Validação básica
    if (!valor || !data || !memberId || !congregacaoId) {
  res.status(400).json({ error: 'Campos obrigatórios não informados.' });
  return;
}

    // Criação da oferta/dízimo
    const offering = await offeringService.createOffering(schema, {
  value: valor,
  date: new Date(data),
  memberId: memberId,
  type: type || "dizimo",
  service: service || null,
  receiptPhoto: receiptPhoto || null,
  numeroRecibo: numeroRecibo || null,
  congregacaoId: congregacaoId // <-- Adicione aqui!
});

    res.status(201).json(offering);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    const { congregacaoId, memberId, type, mes, ano } = req.query;
    const where: any = {};
    if (congregacaoId) where.congregacaoId = Number(congregacaoId);
    if (memberId) where.memberId = Number(memberId);
    if (type) where.type = String(type);

    if (mes && ano) {
      const inicio = new Date(Number(ano), Number(mes) - 1, 1);
      const fim = new Date(Number(ano), Number(mes), 0, 23, 59, 59);
      where.date = { gte: inicio, lte: fim };
    }

    const offerings = await offeringService.listOfferings(schema, where);
    res.json(offerings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    const { id } = req.params;
    const offering = await offeringService.getOffering(schema, Number(id));
    if (!offering) {
      res.status(404).json({ error: 'Registro não encontrado.' });
      return;
    }
    res.json(offering);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    const { id } = req.params;
    const data = req.body;
    const offering = await offeringService.updateOffering(schema, Number(id), data);
    res.json(offering);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    const { id } = req.params;
    await offeringService.removeOffering(schema, Number(id));
    res.json({ message: 'Registro removido com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE RECEIPT PHOTO
export const updateReceiptPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    const { id } = req.params;
    const { receiptPhoto } = req.body;
    const offering = await offeringService.updateOffering(schema, Number(id), { receiptPhoto });
    res.json(offering);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE RECEIPT PHOTO
export const deleteReceiptPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    const { id } = req.params;
    const offering = await offeringService.getOffering(schema, Number(id));
    if (!offering || !offering.receiptPhoto) {
      res.status(404).json({ error: 'Comprovante não encontrado' });
      return;
    }

    const filePath = path.resolve(__dirname, '../../', offering.receiptPhoto);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await offeringService.updateOffering(schema, Number(id), { receiptPhoto: null });
    res.json({ message: 'Comprovante removido com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// LIST RECEIPTS
export const listReceipts = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      res.status(400).json({ error: 'Schema não informado no header.' });
      return;
    }
    const { congregacaoId, mes, ano } = req.query;
    if (!congregacaoId) {
      res.status(400).json({ error: 'Informe o congregacaoId' });
      return;
    }

    const where: any = {
      congregacaoId: Number(congregacaoId),
      receiptPhoto: { not: null }
    };

    if (mes && ano) {
      const inicio = new Date(Number(ano), Number(mes) - 1, 1);
      const fim = new Date(Number(ano), Number(mes), 0, 23, 59, 59);
      where.date = { gte: inicio, lte: fim };
    }

    const comprovantes = await offeringService.listReceipts(schema, where);
    res.json(comprovantes);
  } catch (error: any){
    res.status(500).json({ error: error.message });
  }
};