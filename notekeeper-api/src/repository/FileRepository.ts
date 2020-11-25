import {
  PoolConnection
} from "mysql"

import {
  query
} from "../db";

import {
  serializeFileInput
} from "../model/file/functions";

import {
  FileInputExtended
} from "../model/file/types";

import { User } from "../model/user/types";

const storeFile = async (connection: PoolConnection, { id: creator_id }: User, file: FileInputExtended): Promise<number> => {
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


const FileRepository = {
  storeFile
};


export default FileRepository;