import { connect } from "../db";

import { FileInputExtended } from "../model/file/types";

import { User } from "../model/user/types";

import * as FileRepository from "../repository/FileRepository";

// TODO: check permission
export const storeFile = async (file: FileInputExtended, user: User): Promise<number> => 
  await connect(async (connection) => 
    await FileRepository.storeFile(connection, user, file)
  )
