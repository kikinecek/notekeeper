import config from "../config";

import redis from "redis";

const client = redis.createClient(config.REDIS);

const setJson = (key: string, value: any) => 
  new Promise((resolve, reject) =>
    client.set(key, JSON.stringify(value), (err) => {
      err ? reject(err) : resolve();
    })
  )

const getJson = async (key: string) => {
  const value: string = await new Promise((resolve, reject) => 
    client.get(key, (err, value) => {
      err ? reject(err) : resolve(value || undefined)
    })
  )

  return value ? JSON.parse(value) : undefined;
}

const del = (key: string) => 
  new Promise((resolve, reject) =>
    client.del(key, (err) => {
      err ? reject(err) : resolve();
    })
  )

const expire = (key: string, seconds: number) =>
  new Promise((resolve, reject) =>
    client.expire(key, seconds, (error) =>
      error ? reject(error) : resolve()
    )
  );

export {
  setJson,
  getJson,
  del,
  expire,

  client
}