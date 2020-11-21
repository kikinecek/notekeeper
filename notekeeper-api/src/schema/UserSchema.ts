import {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFieldConfig,
  GraphQLObjectType
} from "graphql";

export const User = new GraphQLObjectType({
  name: "User",
  description: "Type describes user's informations",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})
 
export const findUserById: GraphQLFieldConfig<any, any> = {
  type: User,
  description: "Finds user in databse by proveded user id",
  args: {
    userId: {
      type: GraphQLNonNull(GraphQLInt),
      description: "User's id"
    }
  }
}