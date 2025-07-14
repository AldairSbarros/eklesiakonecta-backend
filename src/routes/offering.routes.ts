import { Router } from "express";
import * as offeringController from "../controllers/offering.controller";
import { uploadComprovante } from "../middleware/uploadComprovante.middleware";
import { autenticarJWT } from "../middleware/autenticarJWT";
import { autorizarRoles } from "../middleware/autorizarRoles";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();
const router = Router();

/**
 * @swagger
 * /offering:
 *   post:
 *     summary: Cria uma nova oferta/dízimo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Oferta criada com sucesso
 */
router.post(
  "/",
  autenticarJWT,
  autorizarRoles(["admin", "tesoureiro"]),
  offeringController.create
);

/**
 * @swagger
 * /offering:
 *   get:
 *     summary: Lista todas as ofertas/dízimos
 *     responses:
 *       200:
 *         description: Lista de ofertas retornada com sucesso
 */
router.get("/", offeringController.list);

/**
 * @swagger
 * /offering/{id}:
 *   get:
 *     summary: Busca uma oferta/dízimo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Oferta encontrada com sucesso
 */
router.get("/:id", offeringController.get);

/**
 * @swagger
 * /offering/{id}:
 *   put:
 *     summary: Atualiza uma oferta/dízimo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Oferta atualizada com sucesso
 */
router.put("/:id", offeringController.update);

/**
 * @swagger
 * /offering/{id}:
 *   delete:
 *     summary: Remove uma oferta/dízimo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Oferta removida com sucesso
 */
router.delete("/:id", offeringController.remove);

/**
 * @swagger
 * /offering/{id}/receipt-photo:
 *   put:
 *     summary: Atualiza o comprovante da oferta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               comprovante:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Comprovante atualizado com sucesso
 */
router.put("/:id/receipt-photo", offeringController.updateReceiptPhoto);

/**
 * @swagger
 * /offering/{id}/receipt-photo:
 *   delete:
 *     summary: Remove o comprovante da oferta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comprovante removido com sucesso
 */
router.delete("/:id/receipt-photo", offeringController.deleteReceiptPhoto);

/**
 * @swagger
 * /offering/comprovantes/list:
 *   get:
 *     summary: Lista todos os comprovantes de ofertas
 *     responses:
 *       200:
 *         description: Lista de comprovantes retornada com sucesso
 */
router.get("/comprovantes/list", offeringController.listReceipts);

/**
 * @swagger
 * /offering/{id}/upload-comprovante:
 *   post:
 *     summary: Faz upload do comprovante de uma oferta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               comprovante:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Comprovante enviado com sucesso
 *       400:
 *         description: Arquivo não enviado
 *       500:
 *         description: Erro ao enviar comprovante
 */
router.post(
  "/:id/upload-comprovante",
  autenticarJWT,
  autorizarRoles(["admin", "tesoureiro"]),
  uploadComprovante.single("comprovante"),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!req.file) {
        res.status(400).json({ error: "Arquivo não enviado" });
        return;
      }
      await prisma.offering.update({
        where: { id: Number(id) },
        data: { receiptPhoto: req.file.path.replace(/\\/g, "/") },
      });
      res.json({
        message: "Comprovante enviado com sucesso",
        path: req.file.path,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao enviar comprovante" });
    }
  }
);

/**
 * @swagger
 * /offering/{id}/download-comprovante:
 *   get:
 *     summary: Faz download do comprovante de uma oferta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Download realizado com sucesso
 *       404:
 *         description: Comprovante não encontrado
 *       500:
 *         description: Erro ao baixar comprovante
 */
router.get(
  "/:id/download-comprovante",
  autenticarJWT,
  autorizarRoles(["admin", "tesoureiro"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const offering = await prisma.offering.findUnique({
        where: { id: Number(id) },
      });
      if (!offering || !offering.receiptPhoto) {
        res.status(404).json({ error: "Comprovante não encontrado" });
        return;
      }
      const filePath = path.resolve(offering.receiptPhoto);
      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: "Arquivo não encontrado no servidor" });
        return;
      }
      res.download(filePath);
    } catch (error) {
      res.status(500).json({ error: "Erro ao baixar comprovante" });
    }
  }
);

/**
 * @swagger
 * /offering/{id}/comprovante:
 *   delete:
 *     summary: Remove o comprovante de uma oferta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comprovante excluído com sucesso
 *       404:
 *         description: Comprovante não encontrado
 */
router.delete(
  "/:id/comprovante",
  autenticarJWT,
  autorizarRoles(["admin", "tesoureiro"]),
  async (req, res) => {
    const { id } = req.params;
    const offering = await prisma.offering.findUnique({
      where: { id: Number(id) },
    });
    if (!offering || !offering.receiptPhoto) {
      res.status(404).json({ error: "Comprovante não encontrado" });
      return;
    }
    const filePath = path.resolve(offering.receiptPhoto);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await prisma.offering.update({
      where: { id: Number(id) },
      data: { receiptPhoto: null },
    });
    res.json({ message: "Comprovante excluído com sucesso" });
    return;
  }
);

export default router;