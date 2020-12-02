import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat
} from "graphql";

export const emailNonNullField = {
  type: GraphQLNonNull(GraphQLString),
  description: "Non null string representing email"
}

export const passwordNonNullField = {
  type: GraphQLNonNull(GraphQLString),
  description: "Non null string representing password"
}

export const Rating = new GraphQLObjectType({
  name: "Rating",
  description: "Rating of something  and the ID",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "ID of the rating"
    },
    oneStarCount: {
      type: GraphQLNonNull(GraphQLInt),
      description: "Number of people (or robots :) ) that voted one star"
    },
    twoStarCount: {
      type: GraphQLNonNull(GraphQLInt),
      description: "Number of people (or robots :) ) that voted two stars"
    },
    threeStarCount: {
      type: GraphQLNonNull(GraphQLInt),
      description: "Number of people (or robots :) ) that voted three stars"
    },
    fourStarCount: {
      type: GraphQLNonNull(GraphQLInt),
      description: "Number of people (or robots :) ) that voted four stars"
    },
    fiveStarCount: {
      type: GraphQLNonNull(GraphQLInt),
      description: "Number of people (or robots :) ) that voted five stars"
    },
    rating: {
      type: GraphQLFloat,
      description: "Calculated rating"
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      description: "Date of rating creation"
    }
  })
})