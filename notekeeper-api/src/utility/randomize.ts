import crypto from "crypto";


export const randomizeToken = (tokenLength: number = 128): string =>
  crypto.randomBytes(tokenLength).toString("base64");