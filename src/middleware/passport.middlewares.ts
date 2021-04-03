import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import LocalStrategy from "passport-local";

const localLogin = LocalStrategy.Strategy;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use() here or 
  // passport.use()

  // Use PassportConfig class here
};
