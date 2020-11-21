import { PoolConnection } from "mysql"

import { query } from "../db"

import { UserSignUp } from "../model/auth/types"
import { serializeUserSignUp } from "../model/auth/functions"

import { User } from "../model/user/types";
import { deserializeUser } from "../model/user/functions";

const createUser = async (connection: PoolConnection, data: UserSignUp): Promise<number> => {
  const insertData = serializeUserSignUp(data);

  const { insertId } = await query(
    connection,
    'INSERT INTO user SET ?',
    insertData
  );

  return insertId;
}

const findUserById = async (connection: PoolConnection, userId: number): Promise<User> => {
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

const findUserByEmail = async (connection: PoolConnection, email: string): Promise<User> => {
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

const updateUser = async (connection: PoolConnection, data: User) => {
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

const UserRepository = {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser
}

export default UserRepository;