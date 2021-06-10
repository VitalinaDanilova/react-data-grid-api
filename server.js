const express = require('express');

require('dotenv').config();

const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const main = require('./controllers/main');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const db = require('knex')({
  client: 'pg',
  version: 13.2,
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'inspiron15',
    database: 'react-data-grid',
    port: 5432,
  },
});

app.set('db', db);

app.use('/', main);

app.listen(process.env.PORT || 9000, () => {
  console.log(`Node server is running on port ${process.env.PORT || 9000}`);
});

module.exports = app;
