const DataService = {
  getAllTableData(db) {
    return db.select('*').from('things');
  },
  insertData(db, newData) {
    return db
      .insert(newData)
      .into('things')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  getDataById(db, id) {
    return db.from('things').select('*').where('id', id).first();
  },
  deleteDataFromTable(db, id) {
    return db('things').where({ id }).delete();
  },
  updateTableData(db, id, dataFields) {
    return db('things').where({ id }).update(dataFields);
  },
};

module.exports = DataService;
