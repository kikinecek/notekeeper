import { Response, NextFunction } from "express";

import { retrieveSessionToken } from "./session";

const tokenParse = async (req: any, res: Response, next: NextFunction) => {
  const token = req.get("Authorization");
  if (!token) {
    return next();
  }

  const result = await retrieveSessionToken(token);

  req.user = result;
  req.token = token;

  return next();
}

export default tokenParse;