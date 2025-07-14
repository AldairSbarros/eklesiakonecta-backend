import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

export async function gerarExcel(dados: any[], nomePlanilha = 'Relatório') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(nomePlanilha);

  if (dados.length > 0) {
    worksheet.columns = Object.keys(dados[0]).map(key => ({ header: key, key }));
    worksheet.addRows(dados);
  }

  // Retorna o buffer do arquivo
  return await workbook.xlsx.writeBuffer();
}


export function gerarPDF(dados: any[], titulo = 'Relatório'): Buffer {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(18).text(titulo, { align: 'center' });
  doc.moveDown();

  if (dados.length > 0) {
    Object.keys(dados[0]).forEach(key => doc.fontSize(12).text(key, { continued: true }).text(' | ', { continued: true }));
    doc.moveDown();
    dados.forEach(item => {
      Object.values(item).forEach(val => doc.fontSize(10).text(String(val), { continued: true }).text(' | ', { continued: true }));
      doc.moveDown();
    });
  }

  doc.end();

  return Buffer.concat(buffers);
}