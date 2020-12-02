import { connect } from "../db"

import { User, UserInput } from "../model/user/types";

import * as UserRepository from "../repository/UserRepository";

export const findUserById = async (userId: number, user: User): Promise<User> => 
  connect(async (connection) => {
    const foundUser = await UserRepository.findUserById(connection, userId);

    return foundUser;
  });

export const updateUser = async (user: UserInput) => 
  connect(async (connection) => {
    await UserRepository.findUserById(connection, user.id);

    await UserRepository.updateUser(connection, user);
  })