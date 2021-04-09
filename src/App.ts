import express from "express";
import errorMiddleware from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import dotenv from "dotenv";
import path from "path";
const session = require("express-session");
const connectRedis = require("connect-redis");
import morgan from "passport";
import passport from "passport";
import PassportConfig from "./areas/authentication/config/PassportConfig";

class App {
  private _app: express.Application;
  private readonly _port: number | string = process.env.PORT || 5000;

  constructor(controllers: Controller[]) {
    this._app = express();
    dotenv.config();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public start() {
    this._app.listen(this._port, () => {
      console.log(`App listening on the port ${this._port}`);
    });
  }

  private initializeMiddlewares() {
    require("./middleware/express.middlewares")(this._app).use(express.static(path.join(__dirname, "..", "public")));
    require("./middleware/passport.middlewares")(this._app).use(express.urlencoded({ extended: true }));
    require("./middleware/passport.middlewares")(this._app).set("views", path.join(__dirname, "areas"));
    require("./middleware/passport.middlewares")(this._app).use("view engine", "ejs");

    this._app.use(morgan("tiny"));

    this._app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 1000,
        }
      })
    )

      this._app.use(passport.initialize());
      this._appuse(passport.session());
      PassportConfig.initializeStrategy(passport);

  }

  private initializeErrorHandling() {
    this._app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this._app.use("/", controller.router);
    });
  }
}

export default App;
