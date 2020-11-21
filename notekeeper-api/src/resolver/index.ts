import AuthResolver from "./AuthResolver";
import FileResolver from "./FileResolver";
import UserResolver from "./UserResolver";

const resolvers = {
  ...AuthResolver,
  ...FileResolver,
  ...UserResolver
}

export default resolvers;