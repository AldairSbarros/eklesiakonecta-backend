import { getPrisma } from "../utils/prismaDynamic";

export const createWebhook = async (schema: string, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.webhook.create({ data });
};

export const listWebhooks = async (schema: string) => {
  const prisma = getPrisma(schema);
  return prisma.webhook.findMany();
};

export const getWebhook = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.webhook.findUnique({
    where: { id }
  });
};

export const updateWebhook = async (schema: string, id: number, data: any) => {
  const prisma = getPrisma(schema);
  return prisma.webhook.update({
    where: { id },
    data
  });
};

export const deleteWebhook = async (schema: string, id: number) => {
  const prisma = getPrisma(schema);
  return prisma.webhook.delete({
    where: { id }
  });
};