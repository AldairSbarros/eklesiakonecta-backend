import nodemailer from 'nodemailer';

// Função para criar o transporter dinamicamente (por cliente)
interface SmtpConfig {
  smtpHost: string;
  smtpPort: number | string;
  smtpUser: string;
  smtpPass: string;
}

export function criarTransporter({ smtpHost, smtpPort, smtpUser, smtpPass }: SmtpConfig) {
  return nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: false, // true para porta 465, false para 587/25
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

// Interface para os parâmetros da função enviarEmail
interface EnviarEmailParams {
  smtpConfig: SmtpConfig;
  to: string;
  subject: string;
  html: string;
}

// Função para enviar e-mail
export async function enviarEmail({ smtpConfig, to, subject, html }: EnviarEmailParams) {
  const transporter = criarTransporter(smtpConfig);
  await transporter.sendMail({
    from: `"EklesiaApp" <${smtpConfig.smtpUser}>`, // Remetente
    to,       // Destinatário(s)
    subject,  // Assunto
    html,     // Corpo do e-mail em HTML
  });
}

export function upsertConfigEmail(schema: string, arg1: { clienteId: any; smtpHost: any; smtpPort: any; smtpUser: any; smtpPass: any; email: any; }) {
  throw new Error('Function not implemented.');
}
