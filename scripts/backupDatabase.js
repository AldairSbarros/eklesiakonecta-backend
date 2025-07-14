require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const dbName = process.env.DATABASE_URL.split('/').pop().replace(/["']/g, '');
const dbUser = process.env.PGUSER;
const dbPass = process.env.PGPASSWORD;
const dbHost = 'localhost';
const dbPort = 5432;
const backupDir = path.join(__dirname, '..', 'backups');
const fileName = `backup_${dbName}_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`;

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

process.env.PGPASSWORD = dbPass;

const cmd = `pg_dump -U ${dbUser} -h ${dbHost} -p ${dbPort} -F c -b -v -f "${path.join(backupDir, fileName)}" ${dbName}`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao fazer backup: ${error.message}`);
    return;
  }
  console.log(`Backup realizado com sucesso: ${fileName}`);
});