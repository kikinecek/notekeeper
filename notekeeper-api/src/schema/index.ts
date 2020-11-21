import {
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";

import {
  UserSignIn,
  UserSignUp,
  SignInResult,

  signIn,
  signOut,
  signUp
} from "./AuthSchema"

import {
  uploadMidiFile
} from "./FileSchema";

import {
  User,

  findUserById
} from "./UserSchema"


const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    findUserById
  })
})

const mutationType = new GraphQLObjectType({
  name: "Mutations",
  fields: () => ({
    uploadMidiFile,

    signIn,
    signOut,
    signUp
  })
});

const possibleTypes = [
  UserSignIn,
  UserSignUp,
  SignInResult,
  User
]

const schema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  types: possibleTypes
});

export default schema;