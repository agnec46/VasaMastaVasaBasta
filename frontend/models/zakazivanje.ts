import { Usluga } from "./usluga"

export class Zakazivanje{
  date: Date | null = null
  startDate: Date | null = null
  endDate: Date | null = null
  firmaName: string = ""
  services: Array<Usluga> = []
  kvadratura: number = 0
  tip: string = ""
  povrsinaBazena: number = 0
  povrsinaZelenilo: number = 0
  povrsinaLezaljke: number = 0
  povrsinaFontane: number = 0
  brojStolova: number = 0
  brojStolica: number = 0
  napomena: string = ""
  status: number = 0
  komentar: string = ""
  vlasnik: string = ""
  dekorater: string = ""
  basta: Object | null = null
  poslednjeOdrzavanje: Date | null = null
  odrzavanje: number = 0
}
