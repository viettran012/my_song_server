const connection = require("../../../configs/connectSolFive");

const user = {
  getUserbyEmail: function (email, callback) {
    return connection.query(
      `SELECT * from user where email = '${email}'`,
      callback
    );
  },

  register: function (profile, callback) {
    return connection.query(
      `INSERT INTO user (name, email, picture) value('${profile?.name}', '${profile?.email}', '${profile?.picture}')`,
      callback
    );
  },
  createPlayList: function (
    { userId, title, encodeId, sortDescription, permision },
    callback
  ) {
    return connection.query(
      `INSERT INTO user_playlist (userId, encodeId, title, sortDescription, permision) value('${userId}', '${encodeId}', '${title}','${sortDescription}','${permision}' )`,
      callback
    );
  },

  updatePlayList: function ({ userId, encodeId, per, ...body }, callback) {
    const values = Object.keys(body)
      ?.map((key) => {
        return `${key} = '${body[key]}'`;
      })
      ?.join(",");
    return connection.query(
      `UPDATE user_playlist set ${values} where encodeId = '${encodeId}' and userId = '${userId}'`,
      callback
    );
  },

  getInitInfo: function ({ userId }, callback) {
    return connection.query(
      `SELECT * from user_favorite_playlist WHERE userId = '${userId}' AND is_liked = 1; 
      SELECT * from user_playlist WHERE userId = '${userId}' AND is_deleted = 0;
      SELECT * from user_song_playlist WHERE userId = '${userId}' AND is_deleted = 0;
      SELECT * from user WHERE id = '${userId}';
      `,
      callback
    );
  },

  getFavoriteList: function ({ userId }, callback) {
    return connection.query(
      `SELECT * from user_favorite_playlist WHERE userId = '${userId}' AND is_liked = 1 ORDER BY created_at`,
      callback
    );
  },

  getPlayListRecommend: function (callback) {
    return connection.query(
      `SELECT * from user_playlist WHERE permision = '2' AND is_deleted = '0' ORDER BY created_at DESC
      LIMIT 15`,
      callback
    );
  },

  getUserPlaylist: function ({ userId, id }, callback) {
    return connection.query(
      `SELECT * from user_playlist WHERE encodeId = '${id}' AND is_deleted = 0; 
      SELECT * from user_song_playlist WHERE playlistId = '${id}' AND is_deleted = 0;`,
      callback
    );
  },

  likeSong: function (
    {
      encodeId,
      userId,
      title,
      artistsNames,
      thumbnail,
      thumbnailM,
      duration,
      is_liked = 1,
    },
    callback
  ) {
    return connection.query(
      `INSERT INTO user_favorite_playlist (encodeId, userId, title, artistsNames, thumbnail, thumbnailM, duration, is_liked ) 
      value('${encodeId}', '${userId}', '${title}', '${artistsNames}', '${thumbnail}', '${thumbnailM}', '${duration}', '${is_liked}') 
      ON DUPLICATE KEY UPDATE encodeId = '${encodeId}', userId = '${userId}', title = '${title}', artistsNames = '${artistsNames}', thumbnail = '${thumbnail}', thumbnailM = '${thumbnailM}', duration = '${duration}', is_liked = '${is_liked}'`,
      callback
    );
  },

  addToPlayList: function (
    {
      encodeId,
      userId,
      title,
      artistsNames,
      thumbnail,
      thumbnailM,
      duration,
      playlistId,
    },
    callback
  ) {
    return connection.query(
      `INSERT INTO user_song_playlist (encodeId, userId,playlistId, title, artistsNames, thumbnail, thumbnailM, duration  ) 
      value('${encodeId}', '${userId}', '${playlistId}', '${title}', '${artistsNames}', '${thumbnail}', '${thumbnailM}', '${duration}') 
      ON DUPLICATE KEY UPDATE encodeId = '${encodeId}', userId = '${userId}', playlistId = '${playlistId}', title = '${title}', artistsNames = '${artistsNames}', thumbnail = '${thumbnail}', thumbnailM = '${thumbnailM}', duration = '${duration}' , is_deleted = 0`,
      callback
    );
  },

  removeToPlayList: function (
    {
      encodeId,
      userId,
      title,
      artistsNames,
      thumbnail,
      thumbnailM,
      duration,
      playlistId,
    },
    callback
  ) {
    return connection.query(
      `UPDATE user_song_playlist SET is_deleted = 1 WHERE playlistId = '${playlistId}' AND userId = '${userId}' AND encodeId = '${encodeId}' `,
      callback
    );
  },
};

module.exports = user;
