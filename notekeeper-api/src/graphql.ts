import { graphqlHTTP } from "express-graphql"

import schema from "./schema";
import resolvers from "./resolver";


const http = {
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}

const defined = graphqlHTTP(http);

export default defined;