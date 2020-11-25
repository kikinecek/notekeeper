import {
  getJson as redisGetJson,
  setJson as redisSetJson,
  expire as redisExpire,
  del as redisDelete
} from "../redis/redis";

import { randomizeToken } from "../utility/randomize";

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
  generateSessionToken,
  retrieveSessionToken,
  deleteSessionToken
};