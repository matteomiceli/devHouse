//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)

import { BodyParams, Req } from "@tsed/common";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import passport, { PassportStatic } from "passport";
import { IStrategyOptions, Strategy } from "passport-local";

// import AuthenticationController from "../controllers/Authentication.controller";
import { MockAuthenticationService } from "../services/Authentication.service.mock";

// import userController from "../controllers/userController";
// import GitHubStrategy from "Passport-GitHub2";

export default class PassportConfig {
    private static authService = new MockAuthenticationService
    private static _localStrategy: LocalStrategy;
    private statis _strategyOption: IStrategyOptions = {
        usernameField: "email",
        passwordField: "password",
    };

    public static initializeStrategy(passport: PassportStatic) {
        passport.serializeUser(this.serializeUser);
        passport.deserializeUser(this.deserializeUser);
        this._localStrategy = new this._localStrategy(this._strategyOption, this.signIn);
        passport.use("local", this._localStrategy);

    }

    private static serializeUse(user:IUser, done: (err: any, id?: any) => void) {
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
}

export default class PassportConfig {}
