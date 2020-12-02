import {
  connect,
  transaction
} from "../db";

import { deleteSessionToken } from "../middleware/session";

import { UserSignUp, UserSignIn } from "../model/auth/types";
import { User } from "../model/user/types";

import AuthManager from "../manager/AuthManager";

import * as UserRepository from "../repository/UserRepository";

export const signUp = async (user : UserSignUp): Promise<User> => 
  await connect (async (connection) => 
    await transaction(connection, async () => {
      const userId = await UserRepository.createUser(connection, user);

      await AuthManager.createPassword(connection, userId, user.password);

      return await UserRepository.findUserById(connection, userId);
    })
  )

export const signIn = async (user: UserSignIn ) => 
  await connect(async (connection) => {
    const result =  await AuthManager.validateSignIn(connection, user);

    return result;
  })


export const signOut = async (token: string) => 
    deleteSessionToken(token)
