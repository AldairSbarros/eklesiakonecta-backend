import { Router, Request, Response } from 'express';
import * as configEmailService from '../services/email.service';

const router = Router();

// Rota para cadastrar ou atualizar as configurações SMTP do cliente
router.post('/config-email', async (req: Request, res: Response): Promise<void> => {
  const schema = req.headers['schema'] as string;
  if (!schema) {
    res.status(400).json({ error: 'Schema não informado no header.' });
    return;
  }

  const { clienteId, smtpHost, smtpPort, smtpUser, smtpPass, email } = req.body;

  if (!clienteId || !smtpHost || !smtpPort || !smtpUser || !smtpPass || !email) {
    res.status(400).json({ error: 'Dados obrigatórios faltando.' });
    return;
  }

  try {
    // Chama o service, passando o schema
    const config = await configEmailService.upsertConfigEmail(schema, {
      clienteId,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      email
    });
    res.json({ ok: true, config });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar configuração de e-mail.' });
  }
});

export default router;

// Implementation for upsertConfigEmail in ../services/email.service.ts

// Example type for config data
type ConfigEmailData = {
  clienteId: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  email: string;
};

// Simulated database (replace with real DB logic)
const configs: Record<string, ConfigEmailData> = {};

/**
 * Inserts or updates the SMTP config for a client in the given schema.
 * @param schema The database schema/tenant.
 * @param data The config data.
 * @returns The saved config.
 */
export async function upsertConfigEmail(
  schema: string,
  data: ConfigEmailData
): Promise<ConfigEmailData> {
  // In a real implementation, use the schema to select the correct DB/tenant.
  // Here, we just use clienteId as key for simplicity.
  configs[data.clienteId] = { ...data };
  // Simulate async DB operation
  return Promise.resolve(configs[data.clienteId]);
}