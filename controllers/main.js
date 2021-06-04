const express = require('express');
const faker = require('faker');
const router = express.Router();
const DataService = require('../module/DataService');

router.get('/seed', function (req, res, next) {
  const db = req.app.get('db');
  db.schema.hasTable('things').then(function (exists) {
    if (!exists) {
      db.schema
        .createTable('things', function (table) {
          table.increments('id').primary();
          table.string('name');
          table.string('value');
        })
        .then(function () {
          const recordsLength = Array.from(Array(100).keys());
          const records = recordsLength.map((rec) => ({
            name: faker.name.findName(),
            value: faker.company.companyName(),
          }));
          db('things')
            .insert(records)
            .then(() => {
              res.send('Seeded data');
            });
        });
    } else {
      res.send('Table exists - Seeded data');
    }
  });
});

router
  .route('/')
  .get(function (req, res, next) {
    const db = req.app.get('db');
    DataService.getAllTableData(db).then((data) => {
      res.send(data);
    });
  })
  .post(function (req, res) {
    const db = req.app.get('db');
    DataService.insertData(db, req.body).then((data) => {
      res.send(data);
    });
  });

router
  .route('/:id')
  .get(function (req, res, next) {
    const db = req.app.get('db');
    DataService.getDataById(db, req.params.id).then((data) => {
      res.send(data);
    });
  })
  .patch(function (req, res) {
    const db = req.app.get('db');
    DataService.updateData(db, req.params.id, req.body).then(() => {
      res.status(204).end();
    });
  })
  .delete(function (req, res) {
    const db = req.app.get('db');
    DataService.deleteDataFromTable(db, req.params.id).then((data) => {
      res.status(204).end();
    });
  });

module.exports = router;

/*
const getTableData = (req, res, db) => {
  db.select("*")
    .from("things")
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExistl: false });
      }
    })
    .catch((e) => res.status(400).json({ dbError: "db error" }));
};

const createTableData = (req, res, db) => {
  const { name, value } = req.body;
  db("react-data-grid")
    .insert({ name, value })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((e) => res.status(400).json({ dbError: "db error" }));
};

const updateTableData = (req, res, db) => {
  const { id, name, value } = req.body;
  db("react-data-grid")
    .where({ id })
    .update({ name, value })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((e) => res.status(400).json({ dbError: "db error" }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.body;
  db("react-data-grid")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch((e) => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  getTableData,
  createTableData,
  updateTableData,
  deleteTableData,
};
*/
