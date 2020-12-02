import { guest, signedIn } from "../middleware/sessionState";

import { UserSignUp, UserSignIn } from "../model/auth/types";
import { User } from "../model/user/types";

import * as AuthService from "../service/AuthService";

import {
  UserSignInValidationSchema,
  UserSignUpValidationSchema
} from "../validatior/AuthValidator";

const signUp = async ({ user }: { user: UserSignUp }): Promise<User> => {
  try {
    await UserSignUpValidationSchema.validateAsync(user, { abortEarly: false });

    return await AuthService.signUp(user);
  } catch (err) {
    console.log(err);

    throw err;
  }
}

const signIn = async ({ user }: { user: UserSignIn }) => {
  try {
    await UserSignInValidationSchema.validateAsync(user, { abortEarly: false });

    return await AuthService.signIn(user);
  } catch (err) {
    console.log(err);

    throw err;
  }
}

const signOut = async (_: any, { token }: any) => 
  await AuthService.signOut(token);

const AuthResolver = {
  signIn: guest(signIn),
  signUp: guest(signUp),
  signOut: signedIn(signOut)
}

export default AuthResolver;