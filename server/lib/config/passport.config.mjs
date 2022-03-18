import { Strategy as LocalStrategy } from "passport-local";
import User from "../../api/models/user.model.mjs";
import { ValidatePassword } from "../PasswordUtilities.mjs";
import passport from "passport";

export default function GetLocalStratConfig() {
  const _passport = passport;
  const verifyCallback = (username, password, done) => {
    User.findOne({ username: username })
      .then((user) => {
        if (!user)
          return done(null, false, { message: "Username doesn't exist." });

        const _isValid = ValidatePassword(password, user.hash, user.salt);

        if (_isValid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
  };

  const strat = new LocalStrategy(verifyCallback);

  _passport.use(strat);

  _passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  _passport.deserializeUser((userId, done) => {
    User.findById(userId)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  });
}
