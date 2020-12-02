import { PoolConnection } from "mysql"

import { UserSignIn, SignInResult } from "../model/auth/types";

import * as AuthRepository from "../repository/AuthRepository";
import * as UserRepository from "../repository/UserRepository";

import { hashPassword, validatePassword } from "../utility/pwd";
import { generateSessionToken } from "../middleware/session";

const createPassword = async (connection: PoolConnection, userId: number, password: string): Promise<void> => {
  const [ hash, salt ] = await hashPassword(password);

  await AuthRepository.createPassword(connection, userId, salt, hash);
}

const updatePassword = async (connection: PoolConnection, userId: number, originalPassword: string, newPassword: string) => {
  const { pwd: foundPwd, salt: foundSalt } = await AuthRepository.findPasswordByUserId(connection, userId);

  const pwdsEquals = await validatePassword(originalPassword, foundPwd, foundSalt);
  if (pwdsEquals) {
    const [ hash, salt ] = await hashPassword(newPassword);
    
    await AuthRepository.updatePassword(connection, userId, salt, hash);
  }

  throw new Error("Incorrect password");
}

const validateSignIn = async (connection: PoolConnection, { email, password }: UserSignIn): Promise<SignInResult> => {
  const user = await UserRepository.findUserByEmail(connection, email);
  const { pwd: foundPwd, salt: foundSalt } = await AuthRepository.findPasswordByUserId(connection, user.id);


  const pwdsEquals = await validatePassword(password, foundPwd, foundSalt);
  if (pwdsEquals) {
    const token = await generateSessionToken(user);
    
    return {
      user,
      token
    };
  }

  // if hash does not equal password from DB, credentials are invalid
  throw new Error("Incorrect password!");
}

const AuthManager = {
  createPassword,
  updatePassword,
  validateSignIn
}

export default AuthManager;