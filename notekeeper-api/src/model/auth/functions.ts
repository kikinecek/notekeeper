import {
  UserSignUpSerialized,
  UserSignUp
} from "./types"

const serializeUserSignUp = ({
  email,
  firstName,
  lastName
}: UserSignUp): UserSignUpSerialized => ({
  email,
  first_name: firstName,
  last_name: lastName
})

export {
  serializeUserSignUp
}