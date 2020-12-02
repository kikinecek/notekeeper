import { signedIn } from "../middleware/sessionState";

import { User, UserInput } from "../model/user/types";
import * as UserService from "../service/UserService";

import { UserInputValidationSchema } from "../validatior/UserValidator";

const findUserById = async ({ userId }: { userId: number }, { user }: { user: User }): Promise<User> => {
  try {
    return await UserService.findUserById(userId, user);
  } catch(err) {
    console.log(err);

    throw err;
  }
}

const updateUser = async ({ user }: { user: UserInput }) => {
  try {
    await UserInputValidationSchema.validateAsync(user, {abortEarly : false});

    return await UserService.updateUser(user);
  } catch (err) {
    console.log(err);

    throw err;
  }
}
  
const UserResolver = {
  findUserById: signedIn(findUserById),
  updateUser: signedIn(updateUser) 
}


export default UserResolver;