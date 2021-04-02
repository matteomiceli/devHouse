import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService, MockAuthenticationService } from "../services";
import * as PassportConfig2 from "../config/PassportConfig2";
import passport from "passport";

const mockAuthService = new MockAuthenticationService();

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(
      `${this.path}/login`,
      passport.authenticate("local", { failureRedirect: `${this.path}/login` }),
      this.login
    );
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/login");
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = (req: express.Request, res: express.Response) => {};
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("you hit the register button");
    const registerInfo = req.body;
    const randomId = Math.floor(Math.random() * 10000);

    mockAuthService.createUser({
      id: randomId.toString(),
      username: registerInfo.userName,
      email: registerInfo.email,
      password: registerInfo.password,
      firstName: registerInfo.firstName,
      lastName: registerInfo.lastName,
    });

    res.redirect(`${this.path}/login`);
  };
  private logout = async (req: express.Request, res: express.Response) => {};
}

export default AuthenticationController;
