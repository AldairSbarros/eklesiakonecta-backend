import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { gerarRelatorioMensalHTML } from '../services/relatorio.service';

const prisma = new PrismaClient();

cron.schedule('0 8 1 * *', async () => {
  const igrejas = await prisma.church.findMany({
    include: { pastorPrincipal: true }
  });
  const dataAtual = new Date();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();

  for (const igreja of igrejas) {
    const pastor = igreja.pastorPrincipal;
    if (!pastor || !pastor.telefone) continue; // telefone = WhatsApp

    const relatorioHTML = await gerarRelatorioMensalHTML(igreja.id, mes, ano);
    await enviarWhatsAppComArquivo(pastor.telefone, Buffer.from(relatorioHTML), 'RelatorioMensal.html');
  }
});

export async function enviarWhatsAppComArquivo(numero: string, buffer: Buffer, nomeArquivo: string) {
  console.log(`Enviando ${nomeArquivo} para ${numero} via WhatsApp`);
  // Aqui vai a integração real com a API do WhatsApp (ex: Twilio)
  return true;
}