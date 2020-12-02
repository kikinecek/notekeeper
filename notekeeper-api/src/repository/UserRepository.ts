import { PoolConnection } from "mysql"

import { query } from "../db"

import { UserSignUp } from "../model/auth/types"
import { serializeUserSignUp } from "../model/auth/functions"

import { User, UserInput } from "../model/user/types";
import { deserializeUser } from "../model/user/functions";

export const createUser = async (connection: PoolConnection, data: UserSignUp): Promise<number> => {
  const insertData = serializeUserSignUp(data);

  const { insertId } = await query(
    connection,
    'INSERT INTO user SET ?',
    insertData
  );

  return insertId;
}

export const findUserById = async (connection: PoolConnection, userId: number): Promise<User> => {
  const [ result ]  = await query(
    connection,
    `
      SELECT *
      FROM user
      WHERE id = ?
      LIMIT 1
    `,
    [
      userId
    ]
  );

  if (!result) {
    throw new Error("User not found!");
  }


  return deserializeUser(result);
}

export const findUserByEmail = async (connection: PoolConnection, email: string): Promise<User> => {
  const [ result ]  = await query(
    connection,
    `
      SELECT *
      FROM user
      WHERE email = ?
      LIMIT 1
    `,
    [
      email
    ]
  );

  if (!result) {
    throw new Error("User not found!");
  }


  return deserializeUser(result);
}

export const updateUser = async (connection: PoolConnection, data: UserInput) => {
  await query(
    connection,
    `
      UPDATE user 
      SET
        email = ?
        first_name = ?
        last_name = ?
      WHERE id = ?
    `,
    [
      data.email,
      data.firstName,
      data.lastName,
      data.id
    ]
  )
}