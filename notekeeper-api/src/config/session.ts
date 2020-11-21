import { SessionOptions } from "express-session";
import { HALF_HOUR } from "../utility/time";

const {
  SESSION_SECRET = "lKnIVRH7eA",
  SESSION_NAME = "sess",
  SESSION_COOKIE_MAX_AGE = HALF_HOUR,

} = process.env;

const session: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_COOKIE_MAX_AGE,
    secure: true,
    sameSite: false
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}

export default session;