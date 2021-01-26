interface Student {
  id: number,
  year: number,
  report: string,
  approved: boolean,
  finalAverage: null | number | string,
  institutionalAverage: null | number | string,
  code: string,
  firstTime: boolean,
  person: Person,
  modality: Modality,
  section: Section,
  grade: Grade
}

interface Person {
  id: number | string,
  username: string,
  firstName: string,
  lastName: string,
  phoneNumber: string | null,
  email: string | null,
  altPhoneNumber: string | null,
  status: boolean,
  sede: Sede
}
