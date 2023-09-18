const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const NOTF_KEY = "dhh38tyif43hfyu1!3323*$34";

const auth_token = {
  get: function (req, res, next) {
    const authorizationBody = req.headers["authentication-token"];
    const JWT_KEY = process.env.JWT_KEY;
    if (authorizationBody) {
      const token = authorizationBody?.replace("Bearer ", "");

      jwt.verify(token, JWT_KEY, (err, data) => {
        if (!data?.id) {
          return res.json({
            result: 0,
          });
        } else {
          const body = req?.body || {};
          const query = req?.query || {};
          req.body = { ...body, userId: data?.id };
          req.query = { ...query, userId: data?.id };
          next();
        }
      });
    } else {
      return res.status(200).json({
        result: 0,
      });
    }
  },
  getNrq: function (req, res, next) {
    const authorizationBody = req.headers["authentication-token"];
    const JWT_KEY = process.env.JWT_KEY;
    if (authorizationBody) {
      const token = authorizationBody?.replace("Bearer ", "");

      jwt.verify(token, JWT_KEY, (err, data) => {
        if (!data?.id) {
          next();
        } else {
          const body = req?.body || {};
          const query = req?.query || {};
          req.body = { ...body, userId: data?.id };
          req.query = { ...query, userId: data?.id };
          next();
        }
      });
    } else {
      next();
    }
  },
  post: function (req, res, next) {
    const authorizationBody = req.headers["authentication-token"];
    const JWT_KEY = process.env.JWT_KEY;
    if (authorizationBody) {
      const token = authorizationBody?.replace("Bearer ", "");
      jwt.verify(token, JWT_KEY, (err, data) => {
        if (!data?.id) {
          return res.json({
            result: 0,
          });
        } else {
          const body = req?.body || {};
          req.body = { ...body, userId: data?.id };
          next();
        }
      });
    } else {
      return res.status(200).json({
        result: 0,
      });
    }
  },

  postNrq: function (req, res, next) {
    const authorizationBody = req.headers["authentication-token"];
    const JWT_KEY = process.env.JWT_KEY;
    if (authorizationBody) {
      const token = authorizationBody?.replace("Bearer ", "");
      jwt.verify(token, JWT_KEY, (err, data) => {
        if (!data?.id) {
          next();
        } else {
          const body = req?.body || {};
          req.body = { ...body, userId: data?.id };
          next();
        }
      });
    } else {
      next();
    }
  },

  send: function () {
    return function (req, res, next) {
      const authorizationBody = req.headers["x-mobicam-token-notification"];

      if (authorizationBody == NOTF_KEY) {
        next();
      } else {
        return res.status(200).json({
          result: 0,
        });
      }
    };
  },
};
module.exports = auth_token;
