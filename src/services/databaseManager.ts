import { exec } from "child_process";

export function criarBanco(nomeBanco: string) {
  exec(`createdb ${nomeBanco}`, (err) => {
    if (!err) {
      exec(`prisma migrate deploy --schema=prisma/${nomeBanco}.prisma`);
    }
  });
}