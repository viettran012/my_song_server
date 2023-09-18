const { ZingMp3 } = require("zingmp3-api-full");

function getData() {
  ZingMp3.getTop100().then((data) => {
    console.log(JSON.stringify(data));
  });
}

module.exports = { getData };
