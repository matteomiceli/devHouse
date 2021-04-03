import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { userModel } from "../../../model/userModel";
import passport from "passport";

export class authenticationService implements IAuthenticationService {
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
      let user = userModel.findById(profile.email);
      if (user) {
        res(user);
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
      }
    });
    throw new Error("Method not implemented");
  }

  private isUserValid(profile: IUser, password): boolean {
    return profile.password === password;
  }
  // const userModel= {
  //   findOne: (email:string) => {
  //     const user = database.users.find((user) => user.email === email);
  //     // console.log("the email is ---------------------- " + email);
  //     if (user) {
  //       return user;
  //     }
  //     throw new Error(`Couldn't find user with email: ${email}`);
  //   },
  //   findById: (id) => {
  //     const user = database.users.find((user) => user.id === id);
  //     if (user) {
  //       return user;
  //     }
  //     console.log(`Couldn't find user with id: ${id}`);
  //     return null;
  //     // throw new Error(`Couldn't find user with id: ${id}`);
  //   },
  // }
}
