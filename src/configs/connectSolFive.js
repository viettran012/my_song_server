var mysql = require("mysql");

const sqlConfig = {
  host: "103.130.216.82",
  // port: "3308",
  user: "tranviet_tranviet",
  password: "thai1407",
  database: "tranviet_solfive",
  multipleStatements: true,
  charset: "utf8mb4",
};
var pool = mysql.createPool(sqlConfig);

module.exports = {
  query: function () {
    var sql_args = [];
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var callback = args[args.length - 1];
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        return callback(err);
      }
      if (args.length > 2) {
        sql_args = args[1];
      }
      connection.ping();
      connection.query(args[0], sql_args, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(null, results);
      });
    });
  },
  connect: function () {
    pool.getConnection(function (err) {
      if (err) {
        return console.log("error when connecting to db: Notification", err);
      }
    });
  },
};
