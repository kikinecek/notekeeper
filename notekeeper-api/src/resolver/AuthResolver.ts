import { connect, transaction } from "../db";

import { guest, signedIn } from "../middleware/sessionState";

import {
  deleteSessionToken
} from "../middleware/session";

import { UserSignUp, UserSignIn } from "../model/auth/types";
import { User } from "../model/user/types";

import AuthManager from "../manager/AuthManager";

import UserRepository from "../repository/UserRepository";

const signUp = async ({ user }: { user: UserSignUp }): Promise<User> => 
  await connect (async (connection) => 
    await transaction(connection, async () => {
      const userId = await UserRepository.createUser(connection, user);

      await AuthManager.createPassword(connection, userId, user.password);

      return await UserRepository.findUserById(connection, userId);
    })
  )
  
const signIn = async ({ user }: { user: UserSignIn }) => 
    await connect(async (connection) => {
      const result =  await AuthManager.validateSignIn(connection, user);

      return result;
    })


const signOut = async (_: any, { token }: any) => 
    deleteSessionToken(token)

const AuthResolver = {
  signIn: guest(signIn),
  signUp: guest(signUp),
  signOut: signedIn(signOut)
}

export default AuthResolver;