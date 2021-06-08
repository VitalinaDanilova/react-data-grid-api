const express = require('express');
const faker = require('faker');
const router = express.Router();
const DataService = require('../module/DataService');

router.get('/seed', function (req, res, next) {
  const db = req.app.get('db');
  db.schema
    .hasTable('things')
    .then(function (exists) {
      if (!exists) {
        db.schema
          .createTable('things', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.string('value');
          })
          .then(function () {
            const recordsLength = Array.from(Array(100).keys());
            const records = recordsLength
              .map((rec) => ({
                name: faker.name.findName(),
                value: faker.company.companyName(),
              }))
              .catch((e) => console.log(e));
            db('things')
              .insert(records)
              .then(() => {
                res.json('Seeded data');
              })
              .catch((e) => console.log(e));
          });
      } else {
        res.json('Table exists - Seeded data');
      }
    })
    .catch((e) => console.log(e));
});

router
  .route('/')
  .get(function (req, res, next) {
    const db = req.app.get('db');
    DataService.getAllTableData(db)
      .then((data) => {
        res.json(data);
      })
      .catch((e) => console.log(e));
  })
  .post(function (req, res) {
    const db = req.app.get('db');
    DataService.insertData(db, req.body).then((data) => {
      res.json(data);
    });
  })
  .put(function (req, res) {
    const db = req.app.get('db');
    DataService.updateTableData(db, req.body.id, {
      name: req.body.name,
      value: req.body.value,
    })
      .then((data) => {
        res.json(data);
        res.end();
      })
      .catch((e) => console.log(e));
  });

router
  .route('/:id')
  .get(function (req, res, next) {
    const db = req.app.get('db');
    DataService.getDataById(db, req.params.id).then((data) => {
      res.json(data);
    });
  })
  .put(function (req, res) {
    const db = req.app.get('db');
    DataService.updateData(db, req.params.id, req.body).then((data) => {
      res.json(data);
    });
  })
  .delete(function (req, res) {
    const db = req.app.get('db');
    DataService.deleteDataFromTable(db, req.params.id).then((data) => {
      res.status(204).end();
    });
  });

module.exports = router;
