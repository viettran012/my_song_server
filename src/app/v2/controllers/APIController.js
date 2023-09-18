const { ZingMp3 } = require("zingmp3-api-full");
const dataModel = require("../models/Data");
const user = require("../models/User");

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

    user?.getPlayListRecommend((err, results, fields) => {
      if (err) {
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
      } else {
        if (results?.length) {
          const recommend = {
            sectionType: "playlist",
            title: "Solfive đề xuất cho bạn",
            items:
              typeof results == "object"
                ? results?.map((rs) => ({
                    ...rs,
                    artistsNames: "Nhiều nghệ sỹ",
                    artists: [{ name: "Nhiều nghệ sỹ" }],
                    thumbnail:
                      "https://tranviet.site/interface/image/solfive_square_thumb.png",
                    thumbnailM:
                      "https://tranviet.site/interface/image/solfive_square_thumb.png",
                  }))
                : [],
          };

          if (
            typeof data?.data?.items == "object" &&
            data?.data?.items?.length
          ) {
            data.data.items = [recommend, ...data?.data?.items];
          }
          return res.json({
            result: 1,
            data: data,
          });
        }
        return res.json({
          result: 1,
          data: data,
        });
      }
    });
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

    if (id?.length == 10) {
      const query = req?.query;

      user.getUserPlaylist({ ...query }, (err, results, fields) => {
        if (err) {
          return res.json({
            result: 0,
          });
        } else {
          let songListRows = results[1];
          let playList = results[0][0];
          if (!results[0]) {
            return res.json({
              result: 0,
            });
          }

          if (
            (playList?.permision == 0 &&
              playList?.userId != query?.userId &&
              playList?.userId) ||
            !playList
          ) {
            return res.json({
              result: 0,
            });
          }

          const playListData = {
            encodeId: playList?.encodeId,
            title: playList?.title,
            artists: songListRows?.map((s) => ({
              name: s?.artistsNames,
            })),
            thumbnail:
              "https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1",
            // thumbnailM:
            //   "https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1",
            song: {
              items: songListRows?.map((song) => {
                return {
                  ...song,
                  artists: song?.artistsNames
                    ?.split(",")
                    ?.map((s) => ({ name: s })),
                };
              }),

              total: songListRows?.length || 0,
              totalDuration: songListRows?.reduce((sum, song) => {
                return song?.duration ? sum + Number(song?.duration || 0) : sum;
              }, 0),
            },
            sortDescription: playList?.sortDescription,
            per: playList?.permision,
            userId: Number(playList?.userId || -1),
          };

          return res.status(200).json({
            result: 1,
            data: {
              data: playListData,
            },
          });
        }
      });
      return;
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
      const playList = data?.data;
      dataModel.saveCrawlPlayListInfo(
        {
          ...playList,
          artists:
            typeof playList?.artists == "object"
              ? playList?.artists?.map((i) => i?.alias)
              : "",
          song:
            typeof playList?.song?.items == "object"
              ? playList?.song?.items?.map((i) => i?.encodeId)
              : "",
        },
        () => {}
      );
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
      res.json({
        result: 1,
        data: data,
      });

      const song = data?.data;
      if (!song) return;
      dataModel.saveCrawlSongSound(
        {
          encodeId: id,
          sound: song["128"] || "",
        },
        () => {}
      );
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
      res.json({
        result: 1,
        data: data,
      });

      const artist = data?.data;
      dataModel.saveArtistInfo(
        {
          ...artist,
          topAlbum: artist?.topAlbum?.encodeId || "",
        },
        () => {}
      );
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
      res.json({
        result: 1,
        data: data,
      });
      const song = data?.data;
      dataModel.saveCrawlSong(
        {
          ...song,
          artists:
            typeof song?.artists == "object"
              ? song?.artists?.map((i) => i?.alias)
              : "",
          album: song?.album?.encodeId,
        },
        () => {}
      );
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
