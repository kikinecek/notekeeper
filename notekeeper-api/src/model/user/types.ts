interface User {
  id: number,
  firstName?: string,
  lastName?: string,
  email: string,
  createdAt: Date
}

interface UserSerialized {
  id: number,
  first_name?: string,
  last_name?: string,
  email: string,
  created_at: string
}


export {
  User,
  UserSerialized
}