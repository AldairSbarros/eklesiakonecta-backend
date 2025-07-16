import { Request, Response } from 'express';
import { getPrisma } from '../utils/prismaDynamic';
import fs from 'fs';
import path from 'path';

export const verificarSistemaConfigurado = async (req: Request, res: Response) => {
  try {
    // Estratégia 1: Verificar se existe arquivo de controle
    const configFile = path.join(process.cwd(), 'sistema_configurado.flag');
    const configuradoPorArquivo = fs.existsSync(configFile);

    if (configuradoPorArquivo) {
      return res.json({
        configurado: true,
        message: 'Sistema já configurado'
      });
    }

    // Estratégia 2: Se não tem arquivo, tentar verificar no banco
    // Pode usar schema padrão ou tentar listar schemas existentes
    try {
      const prisma = getPrisma('public');
      
      // Tentar uma query simples para ver se existe estrutura
      await prisma.$queryRaw`SELECT 1`;
      
      await prisma.$disconnect();
      
      // Se chegou até aqui, sistema pode estar configurado
      // Criar arquivo de flag para próximas verificações
      fs.writeFileSync(configFile, new Date().toISOString());
      
      return res.json({
        configurado: true,
        message: 'Sistema já configurado'
      });
      
    } catch (dbError) {
      // Se der erro no banco, sistema não está configurado
      return res.json({
        configurado: false,
        message: 'Sistema não configurado'
      });
    }

  } catch (error) {
    console.error('Erro ao verificar configuração:', error);
    
    res.json({
      configurado: false,
      message: 'Sistema não configurado'
    });
  }
};