interface Filters {
  search: string
  per_page: string
  page: number
}

interface Meta {
  current_page: number
  from: number
  per_page: string
  to: number
  total: number
}

interface Breadcrumb {
  name: string
  route?: string
}

interface Header {
  name: string
  key: string
  sort: boolean
}
