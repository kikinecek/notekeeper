import {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLFieldConfig,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt
} from "graphql";

import { StoredFile } from "./FileSchema";

import { Rating } from "./BasicSchema";

export const MidiRecordInput = new GraphQLInputObjectType({
  name: "MidiRecordStoreInput",
  description: "Input type for midi record store",
  fields: () => ({
    midiFileId: {
      type: GraphQLNonNull(GraphQLID),
      description: "Id of midi file that is represented by midi record"
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Name of midi record"
    },
    isPublic: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "True = midi record is public, false = midi record is private"
    },
    genre: {
      type: GraphQLString,
      description: "Song's genre"
    }
  })
});

export const MidiRecord = new GraphQLObjectType({
  name: "MidiRecord",
  description: "Input type for midi record store",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Id of midi racord"
    },
    midiFile: {
      type: GraphQLNonNull(StoredFile),
      description: "Stored midi file (song)"
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Name of midi record"
    },
    isPublic: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "True = midi record is public, false = midi record is private"
    },
    genre: {
      type: GraphQLString,
      description: "Song's genre"
    },
    rating: {
      type: GraphQLNonNull(Rating),
      description: "Rating of midi racord"
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      description: "Date when midi record has been created"
    }
  })
}); 

export const storeMidiRecord: GraphQLFieldConfig<any,any> = {
  type: GraphQLNonNull(MidiRecord),
  description: "Stores midi record",
  args: {
    data: {
      type: GraphQLNonNull(MidiRecordInput)
    }
  }
}

export const updateMidiRecord: GraphQLFieldConfig<any,any> = {
  type: GraphQLNonNull(MidiRecord),
  description: "Updates midi record",
  args: {
    data: {
      type: GraphQLNonNull(MidiRecordInput)
    },
    midiRecordId: {
      type: GraphQLInt
    }
  }
}

export const deleteMidiRecord: GraphQLFieldConfig<any,any> = {
  type: GraphQLBoolean,
  description: "Deletes midi record",
  args: {
    midiRecordId : {
      type: GraphQLNonNull(GraphQLID)
    }
  }
}

export const updateMidiRecordRating: GraphQLFieldConfig<any,any> = {
  type: GraphQLNonNull(Rating),
  description: "Updates rating of midi record",
  args: {
    ratingId: {
      type: GraphQLNonNull(GraphQLID)
    },
    rating: {
      type: GraphQLNonNull(GraphQLInt), 
      description: "User's rating in range 1 to 5"
    }
  }
}