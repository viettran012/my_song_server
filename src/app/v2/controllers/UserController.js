const jwt = require("jsonwebtoken");
const user = require("../models/User");
const makeId = require("../../../utils/makeId");
verifyGoogleToken = require("../../../utils/auth/googleVerify");

class UserController {
  index(req, res, next) {
    // console.log(req.data);

    return res.json({
      message: "error",
    });
  }

  async login(req, res, next) {
    const authUser = req?.user;
    if (!authUser) {
      return res.json({
        result: 0,
      });
    }

    user.getUserbyEmail(authUser?.email, (err, results, fields) => {
      const userData = results[0];

      if (!userData.email || !userData?.name || !userData?.id) {
        return res.json({
          result: 0,
        });
      }

      return res.json({
        result: 1,
        data: {
          id: userData?.id,
          email: userData?.email,
          name: userData?.name,
          picture: userData?.picture,
          token: jwt.sign({ id: userData?.id }, process.env.JWT_KEY, {
            expiresIn: "7d",
          }),
        },
      });
    });
  }

  getInitInfo(req, res, next) {
    const data = req?.query;
    if (!data?.userId) {
      return res.json({
        result: 0,
      });
    }
    user.getInitInfo({ ...data }, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.json({
          result: 0,
        });
      } else {
        let fvrRows = results[0].map((row) => {
          return row;
        });
        let songListRows = results[2];
        if (!results[3]) {
          return res.json({
            result: 0,
          });
        }
        const playListData = results[1].map((playList) => {
          return {
            encodeId: playList?.encodeId,
            title: playList?.title,
            thumbnail:
              "https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1",
            // thumbnailM:
            //   "https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1",
            song: {
              items: songListRows?.filter((song) => {
                return song?.playlistId == playList?.encodeId;
              }),
            },
            userId: playList?.userId,
            artists: songListRows?.map((song) => ({
              name: song?.artistsNames,
            })),
            per: playList?.permision,
            sortDescription: playList?.sortDescription,
          };
        });
        res.status(200).json({
          result: 1,
          data: {
            favoriteList: {
              encodeId: "favorite",
              title: "Bài hát yêu thích",
              thumbnail:
                "https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1",
              thumbnailM:
                "https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1",
              song: {
                items: fvrRows,
              },
            },
            playListData: playListData,
            user: results[3][0],
          },
        });
      }
    });
  }

  getFavoriteList(req, res, next) {
    const data = req?.query;
    if (!data?.userId) {
      return res.json({
        result: 0,
      });
    }
    user.getFavoriteList({ ...data }, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.json({
          result: 0,
        });
      } else {
        let fvrRows = results.map((row) => {
          return row;
        });

        res.status(200).json({
          result: 1,
          data: {
            data: {
              encodeId: "favorite",
              title: "Bài hát yêu thích",
              artists: fvrRows?.map((s) => ({
                name: s?.artistsNames,
              })),
              thumbnail:
                "https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1",
              thumbnailM:
                "https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1",
              song: {
                items: fvrRows?.map((song) => {
                  return {
                    ...song,
                    artists: song?.artistsNames
                      ?.split(",")
                      ?.map((s) => ({ name: s })),
                  };
                }),
                total: fvrRows?.length || 0,
                totalDuration: fvrRows?.reduce((sum, song) => {
                  return song?.duration
                    ? sum + Number(song?.duration || 0)
                    : sum;
                }, 0),
              },
              sortDescription:
                "Nhạc mà bạn nhấn nút thích trong ứng dụng sẽ xuất hiện ở đây.",
            },
          },
        });
      }
    });
  }

  createPlayList(req, res, next) {
    const data = req?.body;
    if (!data?.userId || !data?.title) {
      return res.json({
        result: 0,
      });
    }
    const encodeId = makeId(10);
    user.createPlayList({ ...data, encodeId }, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.json({
          result: 0,
        });
      } else {
        res.json({
          result: 1,
          encodeId,
        });
        // let rows = results.map((row) => {
        //   return row;
        // });
        // res.status(200).json({
        //   result: 1,
        //   data: rows,
        // });
      }
    });
  }

  updatePlayList(req, res, next) {
    const data = req?.body;
    if (!data?.userId || !data?.encodeId) {
      return res.json({
        result: 0,
      });
    }
    user.updatePlayList({ ...data }, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.json({
          result: 0,
        });
      } else {
        res.json({
          result: 1,
        });
        // let rows = results.map((row) => {
        //   return row;
        // });
        // res.status(200).json({
        //   result: 1,
        //   data: rows,
        // });
      }
    });
  }

  likeSong(req, res, next) {
    const data = req?.body;
    if (!data?.userId || !data?.encodeId) {
      return res.json({
        result: 0,
      });
    }
    user.likeSong({ ...data }, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.json({
          result: 0,
        });
      } else {
        res.json({
          result: 1,
        });
      }
    });
  }

  addToPlayList(req, res, next) {
    const data = req?.body;
    // console.log(data);
    if (!data?.userId || !data?.encodeId || !data?.playlistId) {
      return res.json({
        result: 0,
      });
    }
    user.addToPlayList({ ...data }, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.json({
          result: 0,
        });
      } else {
        res.json({
          result: 1,
        });
      }
    });
  }

  removeToPlayList(req, res, next) {
    const data = req?.body;
    if (!data?.userId || !data?.encodeId || !data?.playlistId) {
      return res.json({
        result: 0,
      });
    }
    user.removeToPlayList({ ...data }, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.json({
          result: 0,
        });
      } else {
        res.json({
          result: 1,
        });
      }
    });
  }
}

module.exports = new UserController();
