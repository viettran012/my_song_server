const express = require("express");
const router = express.Router();
const api = require("../../app/v2/controllers/APIController");
const auth_token = require("../../utils/auth");

//get
router.get("/get/top100", api.getTop100);
router.get("/get/home", api.getHome);
router.get("/get/song/sound", api.getSong); //done
router.get("/get/song/info", api.getSongInFo); //done
router.get("/get/song/lyric", api.lyricSong);
router.get("/get/song/search", api.searchSong);
router.get("/get/playlist/info", auth_token?.getNrq, api.getDetailPlaylist); //done
router.get("/get/charthome", api.getChartHome);
router.get("/get/artist", api.getArtist);

module.exports = router;
