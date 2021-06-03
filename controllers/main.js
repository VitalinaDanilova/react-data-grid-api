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

const postTableData = (req, res, db) => {
  const { name, value } = req.body;
  const added = new Date();
  db("react-data-grid")
    .insert({ name, value, added })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((e) => res.status(400).json({ dbError: "db error" }));
};

const putTableData = (req, res, db) => {
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
  postTableData,
  putTableData,
  deleteTableData,
};
