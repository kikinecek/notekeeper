import {
  connect
} from "../db";

import {
  FileInputExtended
} from "../model/file/types";

import {
  User
} from "../model/user/types";

import fileRepository from "../repository/FileRepository";

// TODO: check permission
const storeFile = async (file: FileInputExtended, user: User): Promise<number> => 
  await connect(async (connection) => 
    await fileRepository.storeFile(connection, user, file)
  )


const FileService = {
  storeFile
}

export default FileService;
