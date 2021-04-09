//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)

import { BodyParams, Req } from "@tsed/common";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import passport, { PassportStatic } from "passport";
import { IStrategyOptions, IVerifyOptions, Strategy } from "passport-local";
import { stringify } from "querystring";

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

    private static authService = new MockAuthenticationService();
    private static _localStrategy: LocalStrategy;
    private static _strategyOption: IStrategyOptions = {
        usernameField: "email",
        passwordField: "password",
    };

    public static initializeStrategy(passport: PassportStatic) {
        passport.serializeUser(this.serializeUser);
        passport.deserializeUser(this.deserializeUser);
        this._localStrategy = new this._localStrategy(this._strategyOption, this.signIn);
        passport.use("local", this._localStrategy);

    }

    private static serializeUser(user: IUser, done: (err: any, id?: any) => void) {
        done(null, user.id);

    }
    

    private static async deserializeUser(id: string, done: (err: any, id?: any) => void) {
        done(null, user.id);

    }

    private static async deserializeUser(id: string, done: (err: any, user?: any) => void ) {
        let user = await PassportConfig.authService.findUserById(id);

        if (user) {
            return done(null, user);

        } else {
            return done({ message: "This user is not found."}, null)
        }
    }

    private static async signIn(
        email: string,
        password: string,
        done: (ertror: any, user?: IUser | boolean, options?: IVerifyOptions) => void 
    ) {
        
    }
}

