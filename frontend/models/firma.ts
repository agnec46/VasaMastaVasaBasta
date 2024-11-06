import { Usluga } from "./usluga"

export class Firma{
  name: String = ""
  address: String = ""
  location: String = ""
  contact: String = ""
  services: Usluga[] = []
  workers: String[] = []
  startDate: Date | null = null
  endDate: Date | null = null
}
