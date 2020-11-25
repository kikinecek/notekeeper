import AuthResolver from "./AuthResolver";
import FileResolver from "./FileResolver";
import MidiRecordResolver from "./MidiRecordResolver";
import UserResolver from "./UserResolver";

const resolvers = {
  ...AuthResolver,
  ...FileResolver,
  ...MidiRecordResolver,
  ...UserResolver
}

export default resolvers;