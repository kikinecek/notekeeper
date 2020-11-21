import { PoolConnection } from "mysql"

import { query } from "../db"

import { Password } from "../model/auth/types";

const createPassword = async (connection: PoolConnection, userId: number, salt: string, password: string): Promise<number> => {
  const { insertId } = await query(
    connection,
    "INSERT INTO password SET user_id = ?, salt = ?, pwd = ?",
    [
      userId,
      salt,
      password
    ]
  )

  return insertId;
}

const updatePassword = async (connection: PoolConnection, userId: number, salt: string, password: string) => { 
  const { insertId } = await query(
    connection,
    "UPDATE password SET pwd = ?, salt = ? WHERE user_id = ?",
    [
      salt,
      password,
      userId
    ]
  )

  return insertId;
}

const findPasswordByUserId = async (connection: PoolConnection, userId: number): Promise<Password> => {
  const [ result ] = await query(
    connection,
    `
      SELECT *
      FROM password
      WHERE user_id = ?
      LIMIT 1
    `,
    [
      userId
    ]
  )

  return result;
}


const AuthRepository = {
  createPassword,
  findPasswordByUserId,
  updatePassword
}

export default AuthRepository;