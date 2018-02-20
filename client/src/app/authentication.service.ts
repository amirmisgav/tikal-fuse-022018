import {Injectable} from '@angular/core';
import {CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
import {config} from './config/auth.config';
import {User} from './model/user.inerface';

@Injectable()
export class AuthenticationService {

  constructor() {
  }

  getCurrentUser(): User {
    const userPool = this.getUserPool();
    return this.mapToUser(userPool.getCurrentUser());
  }

  mapToUser(user: CognitoUser): User {
    return user ? {
      fullName: user.getUsername()
    } : null;
  }

  async signupUser(username: string, password: string) {
    const pull = this.getUserPool();
    return await pull.signUp(username, password, [], null,
      (err, result)  => console.log(`i'm doing nothing`, err, result ));
  }

  private getUserPool() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    return userPool;
  }

}
