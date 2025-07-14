export function logAuditoria(acao: string, detalhes: any) {
  const dataHora = new Date().toISOString();
  console.log(`[AUDITORIA] ${dataHora} | ${acao} |`, detalhes);
}

export function logDebug(mensagem: string, detalhes?: any) {
  const dataHora = new Date().toISOString();
  console.log(`[DEBUG] ${dataHora} | ${mensagem}`, detalhes || "");
}