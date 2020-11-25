import {
  GraphQLNonNull,
  GraphQLString
} from "graphql";

export const emailNonNullField = {
  type: GraphQLNonNull(GraphQLString),
  description: "Non null string representing email"
}

export const passwordNonNullField = {
  type: GraphQLNonNull(GraphQLString),
  description: "Non null string representing password"
}