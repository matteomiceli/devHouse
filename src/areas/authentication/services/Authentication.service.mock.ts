import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { userModel } from "../../../model/fakeUserModel";
import passport from "passport";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    return new Promise((res, err) => {
      let user = userModel.findByEmail(email);  
      if (user) {
        if (this.isUserValid(user, password)) {
          res(user);
        }
      } else {
        res(null);
      }
      err(new Error(`Couldn't find user with email: ${email}; or invalid password`));
    });
  }

  public async findUserByEmail(email: string): Promise<null | IUser> {
    return new Promise((res, err) => {
      let user = userModel.findByEmail(email);
      if (user) {
        res(user);
      } else {
        res(null);
      }
      err(new Error(`Couldn't find user with email: ${email}`));
    });
  }

  public async findOrCreateUser(profile: IUser): Promise<IUser> {
    return new Promise((res, err) => {
      let user = userModel.findByEmail(profile.email);
      if (user) {
        res(user);
        console.log("user exists");
      } else {
        database.users.push({
          id: profile.id,
          email: profile.email,
          password: profile.password,
          firstName: profile.firstName,
          lastName: profile.lastName,
          username: profile.username,
        });
        user = userModel.findById(profile.id);
        res(user);
        console.log(database.users);
      }
    });
  }

  public async createUser(profile: IUser): Promise<IUser> {
    return new Promise((res, err) => {
      let user = userModel.findByEmail(profile.email);
      if (user) {
        err(profile.email);
      } else {
        database.users.push({
          id: profile.id,
          email: profile.email,
          password: profile.password,
          firstName: profile.firstName,
          lastName: profile.lastName,
          username: profile.username,
        });
        user = userModel.findById(profile.id);
        res(user);
        console.log(database.users);
      }
    });
  }

  private isUserValid(profile: IUser, password): boolean {
    return profile.password === password;
  }
}