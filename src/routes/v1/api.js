const express = require("express");
const router = express.Router();
const api = require("../../app/v1/controllers/APIController");
const auth_token = require("../../utils/auth");

//get
router.get("/get/top100", api.getTop100);
router.get("/get/home", api.getHome);
router.get("/get/song/sound", api.getSong);
router.get("/get/song/info", api.getSongInFo);
router.get("/get/song/lyric", api.lyricSong);
router.get("/get/song/search", api.searchSong);
router.get("/get/playlist/info", api.getDetailPlaylist);
router.get("/get/charthome", api.getChartHome);
router.get("/get/artist", api.getArtist);

module.exports = router;
