import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLFieldConfig
} from "graphql";

import {
  GraphQLUpload
} from "graphql-upload";


export const uploadMidiFile: GraphQLFieldConfig<any, any> = {
  type: GraphQLNonNull(GraphQLBoolean),
  description: "Mutation uploading midi file",
  args: {
    file: {
      type: GraphQLNonNull(GraphQLUpload),
      description: "Midi file"
    }
  }
};