const user = require("../../app/v2/models/User");

const checkUser = {
  isExist: function (email, callback) {
    return user.getUserbyEmail(email, callback);
  },
};

module.exports = checkUser;
