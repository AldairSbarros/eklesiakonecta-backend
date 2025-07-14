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

// Rota principal para criar oferta/dízimo
router.post(
  "/",
  autenticarJWT,
  autorizarRoles(["admin", "tesoureiro"]),
  offeringController.create
);

// Rotas REST padrão
router.get("/", offeringController.list);
router.get("/:id", offeringController.get);
router.put("/:id", offeringController.update);
router.delete("/:id", offeringController.remove);

router.put("/:id/receipt-photo", offeringController.updateReceiptPhoto);
router.delete("/:id/receipt-photo", offeringController.deleteReceiptPhoto);
router.get("/comprovantes/list", offeringController.listReceipts);

// Rotas customizadas para comprovante
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