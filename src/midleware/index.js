const checkUser = require("../utils/auth/checkUser");
const user = require("../app/v2/models/User");

async function googleAuth(req, res, next) {
  const data = req?.body;
  if (!data?.credential) {
    return res.json({
      result: 0,
    });
  }

  const verificationResponse = await verifyGoogleToken(req.body.credential);

  if (verificationResponse.error) {
    return res.status(400).json({
      message: verificationResponse.error,
      result: 0,
    });
  }

  const profile = verificationResponse?.payload;
  checkUser.isExist(profile?.email, (err, results, fields) => {
    if (!results?.length) {
      user.register(profile, (err, results, fields) => {
        if (err) {
          return res.json({
            result: 0,
          });
        }
        req.user = profile;
        return next();
      });
    } else {
      req.user = profile;
      return next();
    }
  });
}

module.exports = { googleAuth };
