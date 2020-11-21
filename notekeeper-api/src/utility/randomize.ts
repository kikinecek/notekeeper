import crypto from "crypto";


const randomizeToken = (tokenLength: number = 128): string =>
  crypto.randomBytes(tokenLength).toString("base64");


export {
  randomizeToken
}