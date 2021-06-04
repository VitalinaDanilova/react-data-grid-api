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
  connection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'react-data-grid',
    port: 5432,
  },
  pool: { min: 2, max: 10 },
});

app.set('db', db);

app.use('/', main);

/*
app.get('/', (req, res) => res.send("It's alive!"));
app.get('/items', (req, res) => main.getTableData(req, res, db));
app.post('/items', (req, res) => main.postTableData(req, res, db));
app.put('/items/:id', (req, res) => main.putTableData(req, res, db));
app.delete('/items/:id', (req, res) => main.deleteTableData(req, res, db));
*/

app.listen(process.env.PORT || 9000, () => {
  console.log(`Node server is running on port ${process.env.PORT || 9000}`);
});

module.exports = app;
