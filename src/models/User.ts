interface User {
  id: number,
  role: Role,
  subject: Subject | null,
  username: string,
  firstName: string,
  lastName: string,
  phoneNumber: string | null,
  email: string | null,
  altPhoneNumber: string | null,
  status: boolean
}
