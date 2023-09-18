const connection = require("../../../configs/connectSolFive");
const getTime = require("../../../utils/getTime");

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

  saveCrawlSong: function (
    {
      encodeId,
      title,
      alias,
      artistsNames,
      artists,
      thumbnailM,
      thumbnail,
      duration,
      album,
    },
    callback
  ) {
    return connection.query(
      `INSERT INTO crawl_song_info (encodeId, title, alias, artistsNames, artists, thumbnailM, thumbnail, duration, album) 
      value('${encodeId}',
        '${title}',
        '${alias}',
        '${artistsNames}',
        '${artists}',
        '${thumbnailM}',
        '${thumbnail}',
        '${duration}',
        '${album}') ON DUPLICATE KEY UPDATE createdAt = '${getTime.currenUnix()}'`,
      callback
    );
  },

  saveCrawlPlayListInfo: function (
    {
      encodeId,
      title,
      thumbnail,
      sortDescription,
      artistsNames,
      artists,
      thumbnailM,
      description,
      song,
    },
    callback
  ) {
    return connection.query(
      `INSERT INTO crawl_playlist_info (encodeId,
        title,
        thumbnail,
        sortDescription,
        artistsNames,
        artists,
        thumbnailM,
        description,
        song) 
      value( '${encodeId}',
        '${title}',
        '${thumbnail}',
        '${sortDescription}',
        '${artistsNames}',
        '${artists}',
        '${thumbnailM}',
        '${description}',
        '${song}') ON DUPLICATE KEY UPDATE createdAt = '${getTime.currenUnix()}'`,
      callback
    );
  },

  saveCrawlSongSound: function ({ encodeId, sound }, callback) {
    return connection.query(
      `INSERT INTO crawl_song_sound (
        encodeId,	sound) 
      value( '${encodeId}',
        '${sound}') ON DUPLICATE KEY UPDATE createdAt = '${getTime.currenUnix()}'`,
      callback
    );
  },

  saveArtistInfo: function (
    {
      id,
      name,
      alias,
      playlistId,
      thumbnail,
      biography,
      sortBiography,
      thumbnailM,
      national,
      birthday,
      realname,
      totalFollow,
      topAlbum,
    },
    callback
  ) {
    return connection.query(
      `INSERT INTO crawl_artist_info ( 
        encodeId,
        name,
        alias,
        playlistId,
        thumbnail,
        biography,
        sortBiography,
        thumbnailM,
        national,
        birthday,
        realname,
        totalFollow,
        topAlbum) 
      value( '${id}',
      '${name}',
      '${alias}',
      '${playlistId}',
      '${thumbnail}',
      '${biography}',
      '${sortBiography}',
      '${thumbnailM}',
      '${national}',
      '${birthday}',
      '${realname}',
      '${totalFollow}',
      '${topAlbum}') ON DUPLICATE KEY UPDATE createdAt = '${getTime.currenUnix()}'`,
      callback
    );
  },
};

module.exports = data;
