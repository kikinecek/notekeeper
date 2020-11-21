import { connect } from "../db"

import { signedIn } from "../middleware/sessionState";

import { User } from "../model/user/types";

import UserRepository from "../repository/UserRepository";

const findUserById = async ({ userId }: { userId: number }, { user }: { user: User }): Promise<User> => 
  connect(async (connection) => {
    const foundUser = await UserRepository.findUserById(connection, userId);

    return foundUser;
  });


const updateUser = async ({ user }: { user: User }) => 
  connect(async (connection) => {
    await UserRepository.findUserById(connection, user.id);

    await UserRepository.updateUser(connection, user);
  })

  
  const UserResolver = {
    findUserById: signedIn(findUserById),
    updateUser: signedIn(updateUser) 
  }


export default UserResolver;