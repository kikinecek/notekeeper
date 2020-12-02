import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLFieldConfig
} from "graphql";

import { User } from "./UserSchema";

const emailNonNullField = {
  type: GraphQLNonNull(GraphQLString),
  description: "Non null string representing email"
}

const passwordNonNullField = {
  type: GraphQLNonNull(GraphQLString),
  description: "Non null string representing password"
}

export const UserSignUp = new GraphQLInputObjectType({
  name: "UserSignUp",
  description: "User's sign up data",
  fields: () => ({
    email: emailNonNullField,
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    password: passwordNonNullField
  })
});

export const UserSignIn = new GraphQLInputObjectType({
  name: "UserSignIn",
  description: "User's sign in data",
  fields: () => ({
    email: emailNonNullField,
    password: passwordNonNullField
  })
})

export const SignInResult = new GraphQLObjectType({
  name: "signInResult",
  description: "Output of signIn",
  fields: () => ({
    token: {
      type: GraphQLNonNull(GraphQLString),
      description: "Session token"
    },
    user: {
      type: GraphQLNonNull(User),
      description: "User's data"
    }
  })
})

export const signIn: GraphQLFieldConfig<any, any> = {
  type: SignInResult,
  description: "Sign in user",
  args: {
    user: {
      type: GraphQLNonNull(UserSignIn),
      description: "User's credentials"
    }
  }
};

export const signOut: GraphQLFieldConfig<any, any> = {
  type: GraphQLNonNull(GraphQLBoolean),
  description: "Sign out user"
}

export const signUp: GraphQLFieldConfig<any, any> = {
  type: GraphQLNonNull(User),
  description: "Sign up user",
  args: {
    user: {
      type: GraphQLNonNull(UserSignUp)
    }
  }
}