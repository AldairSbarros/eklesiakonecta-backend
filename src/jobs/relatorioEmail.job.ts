import cron from 'node-cron';
import { enviarEmail } from '../services/email.service';
import { gerarRelatorioMensalHTML } from '../services/relatorio.service';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


// Função que busca todos os clientes com configuração de e-mail
async function getAllClientesComConfigSMTP() {
  return prisma.configEmail.findMany();
}

// Agenda para todo dia 1º do mês às 08:00
cron.schedule('0 8 1 * *', async () => {
  console.log('Iniciando envio automático de relatórios mensais...');
  const clientes = await getAllClientesComConfigSMTP();
  for (const cliente of clientes) {
    try {
      const now = new Date();
      const mes = now.getMonth() + 1; // getMonth() is zero-based
      const ano = now.getFullYear();
      const relatorio = await gerarRelatorioMensalHTML(cliente.clienteId, mes, ano);
      await enviarEmail({
        smtpConfig: {
          smtpHost: cliente.smtpHost,
          smtpPort: cliente.smtpPort,
          smtpUser: cliente.smtpUser,
          smtpPass: cliente.smtpPass,
        },
        to: cliente.email, // ou lista de destinatários
        subject: 'Relatório Mensal EklesiaApp',
        html: relatorio,
      });
      console.log(`Relatório mensal enviado para ${cliente.email}`);
    } catch (err) {
      console.error(`Erro ao enviar relatório para ${cliente.email}:`, err);
    }
  }
});