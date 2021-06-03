const express = require('express');

require('dotenv').config();

const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const db = require('knex')({
  client: 'pg',
  connection: {
    host: '172.28.3.28:9000',
    user: '',
    password: '',
    database: 'react-data-grid',
  },
});

const main = require('./controllers/main');
const app = express();

const whitelist = ['http://localhost:3000'];
const corsOption = {
  origin: function (origin, cb) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
};

app.use(helmet());
app.use(cors(corsOption));
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('its alive'));
app.get('/crud', (req, res) => main.getTableData(req, res, db));
app.post('/crud', (req, res) => main.postTableData(req, res, db));
app.put('/crud', (req, res) => main.putTableData(req, res, db));
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Node server is running on port ${process.env.PORT || 3000}`);
});
