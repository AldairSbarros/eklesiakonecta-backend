import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    // Pegue congregacaoId, ano e mes do body ou query
    const congregacaoId = (req.body.congregacaoId || req.query.congregacaoId || 'desconhecida').toString();
    const ano = (req.body.ano || req.query.ano || new Date().getFullYear()).toString();
    const mes = (req.body.mes || req.query.mes || (new Date().getMonth() + 1)).toString();

    const folder = path.resolve(__dirname, `../../uploads/${congregacaoId}/${ano}-${mes}`);
    fs.mkdirSync(folder, { recursive: true }); // Cria a pasta se não existir
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export default upload;