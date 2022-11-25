const Sequalize = require('sequielize');
require('dotenv').config();

let sequielize;

if(ProcessingInstruction.env.JAWSDB_URL) {
  sequielize = new Sequalize(process.env.JAWSDB_URL);
} else {
  sequielize = new Sequalize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
};

module.exports = sequielize;