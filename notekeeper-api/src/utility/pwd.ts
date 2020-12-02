import crypto from "crypto";
import config from "../config";

export const hashPassword = async (password: string, salt?: string): Promise<[string, string]> => {
  const { PWD: { pepper } } = config;

  const saltForHash = salt || crypto.randomBytes(128).toString('base64');
  const iterations = 5000;
  
  const hash: string = await new Promise((resolve, reject) => 
    crypto.pbkdf2(password + pepper, saltForHash, iterations, 64, "sha512", (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(derivedKey.toString("hex"));
    })
  )

  return [ hash, saltForHash ];
}

export const validatePassword = async (password: string, hashedPassword: string, salt: string) => {
  const [ hash ] = await hashPassword(password, salt);

  if (hash === hashedPassword) {
    return true;
  }

  return false;
}