const express = require("express");
const router = express.Router();
const { googleAuth } = require("../../midleware/index");
const user = require("../../app/v1/controllers/UserController");
const auth_token = require("../../utils/auth");

router.post("/auth/google", googleAuth, user.login);
router.get("/get/data/all", user.index);
router.post("/playlist/create", user.createPlayList);
router.post("/playlist/update", user.updatePlayList);
router.post("/song/like", user.likeSong);
router.get("/info/init", user.getInitInfo);
router.post("/playlist/add/song", user.addToPlayList);
router.post("/playlist/remove/song", user.removeToPlayList);

module.exports = router;
