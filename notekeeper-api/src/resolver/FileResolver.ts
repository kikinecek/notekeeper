import { FileUpload } from "graphql-upload";

import { signedIn } from "../middleware/sessionState";

import { User } from "../model/user/types";

import * as FileService from "../service/FileService";

const uploadMidiFile = async ({ file }: { file: Promise<FileUpload> }, { user }: { user: User }) => {
  const {
    createReadStream,
    ...restFile
   } = await file;

  let content = "";
  let size = 0;
  let fileId;
  await new Promise((resolve, reject) => {
    createReadStream()
    .on("data", (chunk) => {
      content += chunk;
      size += chunk.length;
    })
    .on("end", async () => {
        fileId = await FileService.storeFile(
        {
          ...restFile,
          content,
          size
        },
        user
      )

      resolve(fileId);
    })
  })

  return fileId;
}

const FileResolver = {
  uploadMidiFile: signedIn(uploadMidiFile) 
}

export default FileResolver;