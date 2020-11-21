import express from "express";
import sessionParse from "./middleware/tokenParse";

import http from "./graphql";

const runApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  app.use(sessionParse);
  app.use('/graphql', http);

  app.listen(3000);
}

export default runApp;