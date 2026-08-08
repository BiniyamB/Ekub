const Database = require('better-sqlite3');
const db = new Database('dev.db', { readonly: true });
const ekubs = db.prepare('select * from Ekub').all();
console.log('Ekubs:', JSON.stringify(ekubs, null, 2));
const quotas = db.prepare('select id, ekubId, position, status, winnerAt from Quota').all();
console.log('Quotas count:', quotas.length);
const members = db.prepare('select count(*) as c from Member').get();
console.log('Members:', members.c);
db.close();
