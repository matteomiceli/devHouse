import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import LocalStrategy, { Strategy } from "passport-local";
import { authenticationService } from "../areas/authentication/services/Authentication.service.mock";

const localLogin = LocalStrategy.Strategy;

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use() here or 
  // passport.use()
  // Use PassportConfig class here
  app.use(new PassportConfig(new localLogin({usernameField: "test@", passwordField: "test"}, (email: string, password: string, done) => {
    const user = new authenticationService().getUserByEmailAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  })))
};
