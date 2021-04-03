//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)

import { BodyParams, Req } from "@tsed/common";

import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import passport from "passport";
import { IStrategyOptions, Strategy } from "passport-local";
// import AuthenticationController from "../controllers/Authentication.controller";
import { MockAuthenticationService } from "../services/Authentication.service.mock";
// import userController from "../controllers/userController";
// import GitHubStrategy from "Passport-GitHub2";

const userController = new MockAuthenticationService(); //initialize mock Auth Service as userController

export default class PassportConfig {
  localLogin = new Strategy(
    { usernameField: "email", passwordField: "password" },
    (email: string, password: string, done) => {
      userController.getUserByEmailAndPassword(email, password).then((user) => {
        return user
          ? done(null, user)
          : done(null, false, {
              message: "Your login details are not valid, Please try again",
            });
      });
      // return user
      //   ? done(null, user)
      //   : done(null, false, {
      //       message: "Your login details are not valid, Please try again",
      //     });
    }
  );
}

passport.serializeUser(function (userId, done): void {
  done(null, userId);
});

passport.deserializeUser(function (email: string, done): void {
  userController
    .findUserByEmail(email)
    .then((user) => done(null, user))
    .catch((err) => {
      done(err, null);
    });
  // if (user) {
  //   done(null, user);
  // } else {
  //   done({ message: "User not found" }, null);
  // }
});

// @Protocol<IStrategyOptions>({
//   name: "login",
//   useStrategy: Strategy,
//   settings: {
//     usernameField: "email",
//     passwordField: "password"
//   }
// })
// export class LoginLocalProtocol implements OnVerify, OnInstall {
//   constructor(private usersService: MockAuthenticationService) {
//   }

//   async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
//     const {email, password} = credentials;

//     const user = await this.usersService.getUserByEmailAndPassword(email,password);

//     if (!user) {
//       return false;
//       // OR throw new NotAuthorized("Wrong credentials")
//     }

//     // if (!user.verifyPassword(password)) {
//     //   return false;
//     //   // OR throw new NotAuthorized("Wrong credentials")
//     // }

//     return user;
//   }

//   $onInstall(strategy: Strategy): void {
//     // intercept the strategy instance to adding extra configuration
//   }
// }
