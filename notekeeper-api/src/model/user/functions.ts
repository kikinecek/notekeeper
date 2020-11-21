import { User, UserSerialized } from "./types"

const serializeUser = ({
  id,
  firstName,
  lastName,
  email,
  createdAt
}: User): UserSerialized => ({
  id,
  first_name: firstName,
  last_name: lastName,
  email,
  created_at: createdAt.toUTCString()
})

const deserializeUser = ({
  id,
  first_name,
  last_name,
  email,
  created_at
}: UserSerialized): User => ({
  id,
  firstName: first_name || undefined,
  lastName: last_name || undefined,
  email,
  createdAt: new Date(created_at)
})

export {
  serializeUser,
  deserializeUser
}