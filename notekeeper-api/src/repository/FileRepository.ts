import { PoolConnection } from "mysql"

import { query } from "../db";

import { serializeFileInput } from "../model/file/functions";
import { FileInputExtended } from "../model/file/types";
import { User } from "../model/user/types";

export const storeFile = async (connection: PoolConnection, { id: creator_id }: User, file: FileInputExtended): Promise<number> => {
  const insertData = serializeFileInput(file); 

  const { insertId } = await query(
    connection,
    'INSERT INTO file SET ?',
    {
      ...insertData,
      creator_id
    }
  );

  return insertId;
};

export const deleteFile = async (connection: PoolConnection, fileId: number): Promise<void> => {
  query(
    connection,
    'DELETE FROM file WEHRE id = ?',
    [
      fileId
    ]
  )
}