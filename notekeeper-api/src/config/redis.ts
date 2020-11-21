const {
  REDIS_HOST = "redis",
  REDIS_PORT = 6379
} = process.env;

const config = {
  host: REDIS_HOST,
  port: +REDIS_PORT
}

export default config;