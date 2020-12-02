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
  StoredFile,

  uploadMidiFile
} from "./FileSchema";

import {
  MidiRecord,
  MidiRecordInput,

  storeMidiRecord,
  updateMidiRecord,
  deleteMidiRecord,

  updateMidiRecordRating
} from "./MidiRecordSchema";

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

    deleteMidiRecord,
    updateMidiRecord,
    storeMidiRecord,

    updateMidiRecordRating,

    signIn,
    signOut,
    signUp
  })
});

const possibleTypes = [
  UserSignIn,
  UserSignUp,
  SignInResult,
  User,

  MidiRecordInput,
  MidiRecord,

  StoredFile
]

const schema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
  types: possibleTypes
});

export default schema;