//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)

import passport from "passport";
import passportLocal from "passport-local";
import _ from "lodash";

import { Request, Response, NextFunction } from "express";
import { authenticationService } from "../services";

const LocalStrategy = passportLocal.Strategy;
const userController = new authenticationService();



export default class PassportConfig {
  
}

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((email: string, done): void => {
  userController
    .findUserByEmail(email)
    .then((user) => done(null, user))
    .catch((err) => {
      done(err, null);
    });
});
/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
    userController.getUserByEmailAndPassword(email, password).then((user) => {
      return user
        ? done(null, user)
        : done(null, false, {
            message: "Your login details are not valid, Please try again",
          });
    });
  })
);

passport.authenticate("local", { failureRedirect: "/auth/login" }),
  function (req, res) {
    // console.log("req.user is ------------------------------------- " + req.user);
    if (req.user.isAdmin === true) {
      res.redirect("/admin-dashboard"); //if req.user has a property of isAdmin that is set to true, then redirects to admin dashboard
    } else {
      // Successful authentication, redirect home.
      res.redirect("/dashboard");
    }
  };

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//   const provider = req.path.split("/").slice(-1)[0];

//   const user = req.user;
//   if (_.find(user.tokens, { kind: provider })) {
//       next();
//   } else {
//       res.redirect(`/auth/${provider}`);
//   }
// };
