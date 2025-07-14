import { Request, Response } from "express";
import * as churchService from "../services/church.service";

const churchController = {
  async create(req: Request, res: Response) {
    try {
      // Remove o campo schema, caso venha no body
      if ('schema' in req.body) delete req.body.schema;

      const novaIgreja = await churchService.createChurch(req.body);
      res.status(201).json({ message: "Igreja cadastrada com sucesso!", igreja: novaIgreja });
    } catch (error: any) {
      if (error.message === "E-mail já cadastrado.") {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(400).json({ error: error.message });
    }
  },

    async atualizarLocalizacao(req: Request, res: Response) {
    const { latitude, longitude } = req.body;
    const { id } = req.params;
    try {
      const igreja = await churchService.updateChurch(Number(id), { latitude, longitude });
      res.json(igreja);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const igrejas = await churchService.listChurches();
      res.json(igrejas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const igreja = await churchService.getChurch(Number(req.params.id));
      if (!igreja) {
        res.status(404).json({ error: "Igreja não encontrada." });
        return;
      }
      res.json(igreja);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      // Remove o campo schema, caso venha no body
      if ('schema' in req.body) delete req.body.schema;

      const igreja = await churchService.updateChurch(Number(id), req.body);
      res.json(igreja);
    } catch (error: any) {
      if (error.message === "E-mail já cadastrado.") {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(400).json({ error: error.message });
    }
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await churchService.deleteChurch(Number(id));
      res.json({ message: "Igreja removida com sucesso." });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};



export default churchController;