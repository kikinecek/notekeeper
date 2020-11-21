import {
  signedIn
} from "../middleware/sessionState";

import {
  User
} from "../model/user/types";

const uploadMidiFile = async (file: File, { user }: { user: User }) => {
  console.log(file);
}

const FileResolver = {
  uploadMidiFile: signedIn(uploadMidiFile) 
}

export default FileResolver;