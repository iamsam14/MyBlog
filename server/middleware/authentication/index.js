const jwt = require("jsonwebtoken");
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../../db/models/User");
const ExtractJwt = require("passport-jwt").ExtractJwt;

let jwtOptions = {
  jwtFromRequest: (req) => {
    if (!req.url.includes('/api')) {
      const token = jwt.sign({ react_app: true }, process.env.JWT_SECRET);
      return token;
    }

    return req.cookies.jwt || ExtractJwt.fromAuthHeaderWithScheme("jwt")(req);
  },
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "jwt",

  new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    if (jwtPayload.react_app) {
      return done(null, true);
    }
    if (Date.now() > jwtPayload.expires) {
      return done(null, false, { message: "jwt expired" });
    }
    let { iat, exp, ...userData } = jwtPayload;
    userData = await User.findById(userData._id);
    return done(null, userData);
  })
);

module.exports = passport;
