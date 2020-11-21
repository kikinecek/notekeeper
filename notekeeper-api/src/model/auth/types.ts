import { User } from "../user/types";

interface UserSignIn {
  email: string,
  password: string
}

interface UserSignUp {
  email: string,
  firstName?: string,
  lastName?: string,
  password: string
}

interface UserSignUpSerialized {
  email: string,
  first_name?: string,
  last_name?: string
}

interface Password {
  id: number,
  salt: string,
  pwd: string
}

interface SignInResult {
  user: User,
  token: string
}


export {
  UserSignIn,
  UserSignUp,
  UserSignUpSerialized,

  SignInResult,

  Password
}