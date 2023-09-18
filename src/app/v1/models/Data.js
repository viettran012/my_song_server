const connection = require("../../../configs/connectSolFive");

const data = {
  saveFixedData: function ({ type, data }, callback) {
    return connection.query(
      `update fixed_data set data = ? where type = ?`,
      [data, type],
      callback
    );
  },

  saveData: function ({ table, id, data }, callback) {
    return connection.query(
      `INSERT INTO ${table} (data_id,data) value('${id}', '${data}') ON DUPLICATE KEY UPDATE data_id = '${id}', data = '${data}'`,
      callback
    );
  },

  getData: function ({ table, id }, callback) {
    return connection.query(
      `select * from ${table} where data_id = ?`,
      [id],
      callback
    );
  },

  getFixedData: function ({ type }, callback) {
    return connection.query(
      "select * from fixed_data where type = ?",
      [type],
      callback
    );
  },
};

module.exports = data;
