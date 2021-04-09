import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import bcrypt from "bcrypt";

import { userModel } from "../../../model/fakeUserModel";
import passport from "passport";
import EmailAlreadyExistsException from "exceptions/EmailAlreadyExists";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;
  

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    let user = await this.findUserByEmail(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return user;
      } else {
        throw new Error("Method not implemented");
      }
    }

  }

  public async findUserByEmail(email: String): Promise<null | IUser> {
    const user = this._db.users.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null;
    throw new Error("Method not implemented");
  }

  public async createUser(user: any): Promise<IUser> {

    const (userExists) = await this.findUserByEmail(user.email);
    if (userExists) {
      // Need to throw error that user already exists by checking email already exists with a user
      throw new EmailAlreadyExistsException();
    } else {
      // Create new user

    }

    throw new Error("Method not implemented");
  }
}
