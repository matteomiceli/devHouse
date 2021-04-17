//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)

import { BodyParams, Req } from "@tsed/common";

import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { runInThisContext } from "node:vm";
import passport, { PassportStatic } from "passport";
import { IStrategyOptions, IVerifyOptions, Strategy } from "passport-local";
import IUser from "../../../interfaces/user.interface";
// import AuthenticationController from "../controllers/Authentication.controller";
import { MockAuthenticationService } from "../services/Authentication.service.mock";
// import userController from "../controllers/userController";
// import GitHubStrategy from "Passport-GitHub2";


export default class PassportConfig {
  private _authService = new MockAuthenticationService();
  private _localStrategy: Strategy;
  private _strategyOptions: IStrategyOptions;


  constructor(passport: PassportStatic) {
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser);
    this._localStrategy = new Strategy(this._strategyOptions, this._loginCredentials);
  }

  private serializeUser(user, done: (err: any, email?: any) => void) {
    done(null, user.email);
  }

  private async deserializeUser(email: string, done: (err: any, id?: any) => void) {
    let user = await this._authService.findUserByEmail(email);
    if (user) {
      return done(null, user);
    }
    return done({ message: 'user not found!' });
  }

  private _loginCredentials(
    email: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void) {
    this._authService.getUserByEmailAndPassword(email, password).then((user) => {
      return user
        ? done(null, user)
        : done(null, false, {
          message: "Your login details are not valid, Please try again",
        });
    });
  }

}







// localLogin = new Strategy(
//   { usernameField: "email", passwordField: "password" },
//   (email: string, password: string, done) => {
//     userController.getUserByEmailAndPassword(email, password).then((user) => {
//       return user
//         ? done(null, user)
//         : done(null, false, {
//           message: "Your login details are not valid, Please try again",
//         });
//     });
//   }
// );


// passport.serializeUser(function (userEmail, done): void {
//   done(null, userEmail);
// });

// passport.deserializeUser(function (email: string, done): void {
  // userController
  //   .findUserByEmail(email)
  //   .then((user) => done(null, user))
  //   .catch((err) => {
  //     done(err, null);
  //   });
  // if (user) {
  //   done(null, user);
  // } else {
  //   done({ message: "User not found" }, null);
  // }
// });

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
