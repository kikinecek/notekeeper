import session from "express-session";
import connectRedis from "connect-redis";
//import redis from "redis";
import {
  client,
  getJson as redisGetJson,
  setJson as redisSetJson,
  expire as redisExpire,
  del as redisDelete
} from "../redis/redis";


import config from "../config";

import { randomizeToken } from "../utility/randomize";

const RedisStore = connectRedis(session);

const definedSession =  session({
  ...config.SESSION,
  store: new RedisStore({ client })
})

const generateSessionToken = async (data: Object, ttl = 1000 * 60 * 60): Promise<string> => {
  const randomToken = randomizeToken();

  await redisSetJson(randomToken, data);
  await redisExpire(randomToken, ttl);

  return randomToken;
}

const retrieveSessionToken = async (key: string): Promise<Object | undefined> => {
  const result = await redisGetJson(key);

  return result;
}

const deleteSessionToken = async (key: string): Promise<void> => {
  await redisDelete(key);
}

export {
  definedSession,

  generateSessionToken,
  retrieveSessionToken,
  deleteSessionToken
};