const { sendMessage } = require("../../../modules/NotificationModule");
const { ZingMp3 } = require("zingmp3-api-full");
const dataModel = require("../models/Data");

class APIController {
  index(req, res, next) {
    // console.log(req.data);

    return res.json({
      message: "error",
    });
  }

  async getHome(req, res, next) {
    // dataModel.getFixedData({ type: "home" }, (err, results, fields) => {
    //   const rows = results[0];
    //   console.log("ok");
    //   res.status(200).json({
    //     result: 1,
    //     data: JSON.parse(rows.data),
    //   });
    // });
    // return;

    const data = await ZingMp3.getHome();

    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      res.json({
        result: 1,
        data: data,
      });

      // dataModel.saveFixedData(
      //   { data: JSON.stringify(data).replace(/'/g, ""), type: "home" },
      //   () => {}
      // );
    }
  }

  async getChartHome(req, res, next) {
    // console.log(req.data);
    const data = await ZingMp3.getChartHome();

    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      res.json({
        result: 1,
        data: data,
      });

      // dataModel.saveFixedData(
      //   { data: JSON.stringify(data), type: "chart_home" },
      //   () => {}
      // );
    }
  }

  async getTop100(req, res, next) {
    // console.log(req.data);
    const data = await ZingMp3.getTop100();

    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      res.json({
        result: 1,
        data: data,
      });

      // dataModel.saveFixedData(
      //   { data: JSON.stringify(data), type: "top100" },
      //   () => {}
      // );
    }
  }

  async getDetailPlaylist(req, res, next) {
    const id = req?.query?.id;

    if (!id) {
      return res.json({
        result: 0,
      });
    }
    const data = await ZingMp3.getDetailPlaylist(id);

    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      res.json({
        result: 1,
        data: data,
      });
    }
  }

  async getSong(req, res, next) {
    // console.log(req.data);
    const id = req?.query?.id;

    if (!id) {
      return res.json({
        result: 0,
      });
    }
    const data = await ZingMp3.getSong(id);
    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      return res.json({
        result: 1,
        data: data,
      });
    }
  }

  async getArtist(req, res, next) {
    // console.log(req.data);
    const id = req?.query?.id;

    if (!id) {
      return res.json({
        result: 0,
      });
    }
    const data = await ZingMp3.getArtist(id);
    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      return res.json({
        result: 1,
        data: data,
      });
    }
  }

  async getSongInFo(req, res, next) {
    // console.log(req.data);
    const id = req?.query?.id;

    if (!id) {
      return res.json({
        result: 0,
      });
    }
    const data = await ZingMp3.getInfoSong(id);

    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      return res.json({
        result: 1,
        data: data,
      });
    }
  }

  async lyricSong(req, res, next) {
    // console.log(req.data);
    const id = req?.query?.id;

    if (!id) {
      return res.json({
        result: 0,
      });
    }
    const data = await ZingMp3.getLyric(id);

    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      return res.json({
        result: 1,
        data: data,
      });
    }
  }

  async searchSong(req, res, next) {
    // console.log(req.data);
    const id = req?.query?.id;

    if (!id) {
      return res.json({
        result: 0,
      });
    }
    const data = await ZingMp3.search(id);

    if (data?.err) {
      return res.json({
        result: 0,
      });
    } else {
      return res.json({
        result: 1,
        data: data,
      });
    }
  }
}

module.exports = new APIController();
