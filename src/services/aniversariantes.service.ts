import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { buscarAniversariantesPorSchema } from '../config/prismaDynamic'; // ajuste o caminho conforme seu projeto

const prisma = new PrismaClient();

// Cron job: roda todo dia às 8h da manhã para todas as igrejas
cron.schedule('0 8 * * *', async () => {
  const igrejas = await prisma.church.findMany();
  for (const igreja of igrejas) {
    const schema = igreja.schema; // ajuste conforme o nome do campo
    const aniversariantes = await buscarAniversariantesPorSchema(schema);
    if (aniversariantes.length > 0) {
      console.log(`Aniversariantes de hoje na igreja ${igreja.nome}:`, aniversariantes.map(a => a.nome));
      // Aqui você pode chamar o serviço de envio de WhatsApp ou e-mail
    } else {
      console.log(`Nenhum aniversariante hoje na igreja ${igreja.nome}.`);
    }
  }
});