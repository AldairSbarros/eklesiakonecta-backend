import { Request, Response } from 'express';
import * as enderecoIgrejaService from '../services/enderecoIgreja.service';

// Criar endereço de igreja
export const create = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const endereco = await enderecoIgrejaService.createEnderecoIgreja(schema, req.body);
    res.status(201).json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar endereços de igreja
export const list = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const enderecos = await enderecoIgrejaService.listEnderecosIgreja(schema);
    res.json(enderecos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obter endereço de igreja por ID
export const get = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const endereco = await enderecoIgrejaService.getEnderecoIgreja(schema, Number(id));
    if (!endereco) return res.status(404).json({ error: 'Endereço não encontrado.' });
    res.json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar endereço de igreja
export const update = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    const endereco = await enderecoIgrejaService.updateEnderecoIgreja(schema, Number(id), req.body);
    res.json(endereco);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remover endereço de igreja
export const remove = async (req: Request, res: Response) => {
  try {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });

    const { id } = req.params;
    await enderecoIgrejaService.deleteEnderecoIgreja(schema, Number(id));
    res.json({ message: 'Endereço removido com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};