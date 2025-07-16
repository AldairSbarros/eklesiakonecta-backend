import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const superEmail = 'aldairbarros@eklesia.app.br';
  const superSenha = await bcrypt.hash('Alsib@2025', 10);

  // Cria o superuser global no schema público (tabela DevUser)
  await prisma.devUser.upsert({
    where: { email: superEmail },
    update: {},
    create: {
      nome: 'Aldair Barros',
      email: superEmail,
      senha: superSenha,
      perfil: 'superuser', // ou 'admin', conforme sua lógica
      ativo: true
    }
  });

  console.log('Superuser global criado ou já existente!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());