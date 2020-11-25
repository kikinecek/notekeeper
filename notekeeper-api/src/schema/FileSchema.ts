import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLObjectType
} from "graphql";

import {
  GraphQLUpload
} from "graphql-upload";

export const StoredFile = new GraphQLObjectType({
  name: "StoredFile",
  description: "File queried from db",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "Id of the file"
    },
    size: {
      type: GraphQLInt,
      description: "File size"
    },
    encoding: {
      type: GraphQLString,
      description: "File encoding"
    },
    content: {
      type: GraphQLString,
      description: "File content"
    }
  })
})

export const uploadMidiFile: GraphQLFieldConfig<any, any> = {
  type: GraphQLNonNull(GraphQLInt),
  description: "Mutation uploading midi file",
  args: {
    file: {
      type: GraphQLNonNull(GraphQLUpload),
      description: "Midi file"
    }
  }
};