const express = require("express");
const router = express.Router();
const { googleAuth } = require("../../midleware/index");
const user = require("../../app/v2/controllers/UserController");
const auth_token = require("../../utils/auth");

router.post("/auth/google", googleAuth, user.login);
router.get("/get/data/all", user.index);
router.post("/playlist/create", auth_token.post, user.createPlayList);
router.post("/playlist/update", auth_token.post, user.updatePlayList);
router.post("/song/like", auth_token.post, user.likeSong);
router.get("/info/init", auth_token.get, user.getInitInfo);
router.get("/get/playlist/favorite", auth_token.get, user.getFavoriteList);
router.post("/playlist/add/song", auth_token.post, user.addToPlayList);
router.post("/playlist/remove/song", auth_token.post, user.removeToPlayList);

module.exports = router;
