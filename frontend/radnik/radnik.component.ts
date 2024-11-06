import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Firma } from '../models/firma';
import { Zakazivanje } from '../models/zakazivanje';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexResponsive,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  responsive?: any; // Add this line to include the responsive property
  labels?: string[]; // Add this line to include the labels property
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
};

export type HistogramChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  currentSection: String = "profils"
  user: User = new User()
  firma: Firma = new Firma()
  zakazivanja: Zakazivanje[] = []
  komentar: String = ''
  mojaZakazivanja: Zakazivanje[] = []
  zakazivanjaServis: Zakazivanje[] = []
  date: Date | null = null
  allZakazivanjaFirme: Zakazivanje[] = []
  a : number[] = []
  public chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      type: 'bar'
    },
    xaxis: {},
    dataLabels: {},
    title: {},
    plotOptions: {}
  }
  public pieChartOptions: Partial<PieChartOptions> = {
    series: [],
    chart: {
      type: 'pie'
    },
    labels: [],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    title: {
      text: 'Distribution of Jobs Among Workers'
    }
  }
  public histogramChartOptions: Partial<HistogramChartOptions> = {
    series: [],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: 'Average Number of Jobs by Days of the Week in the Last 24 Months'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    }
  }

  constructor(private router: Router, private service: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const djerdap = String(localStorage.getItem("logged"))
    this.service.getUser(djerdap).subscribe(
      data => {
        this.user = data
        this.service.getFirme().subscribe(
          data => {
            for (let d of data) {
              for (let w of d.workers) {
                if (w == this.user.username) {
                  this.firma = d
                  this.service.getZakazivanjaServis(this.firma.name, this.user.username).subscribe(
                    data => {
                      this.zakazivanjaServis = data
                    }
                  )
                  this.service.zakazivanjaFirma(this.firma.name).subscribe(
                    data => {
                      this.zakazivanja = data
                      this.service.getMojaZakazivanja(this.firma.name, this.user.username).subscribe(
                        data => {
                          this.mojaZakazivanja = data
                          this.service.getAllZakazivanjaFirme(this.firma.name).subscribe(
                            data => {
                              this.allZakazivanjaFirme = data
                              this.a = this.getBrojPoslovaPoMesecima(this.allZakazivanjaFirme, this.user.username.toString())
                              this.chartOptions = {
                                series: [
                                  {
                                    name: "Broj poslova",
                                    data: this.a
                                  }
                                ],
                                chart: {
                                  type: "bar",
                                  height: 350
                                },
                                plotOptions: {
                                  bar: {
                                    horizontal: false,
                                    columnWidth: "55%",
                                  }
                                },
                                dataLabels: {
                                  enabled: false
                                },
                                xaxis: {
                                  categories: [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                    "Jul",
                                    "Aug",
                                    "Sep",
                                    "Oct",
                                    "Nov",
                                    "Dec"
                                  ]
                                },
                                title: {
                                  text: "Number of Jobs per Month"
                                }
                              };
                              this.loadPieChartData();
                              this.loadHistogramChartData();
                            }
                          )
                        }
                      )
                    }
                  )
                }
              }
            }
          }
        )
      }
    )
    this.route.data.subscribe(data => {
      this.currentSection = data['section'] || 'profil';
    })
  }

  loadPieChartData(): void {
    const workerJobCount: { [key: string]: number } = {};
    this.allZakazivanjaFirme.forEach(z => {
      if (z.dekorater) {
        if (workerJobCount[z.dekorater]) {
          workerJobCount[z.dekorater]++;
        } else {
          workerJobCount[z.dekorater] = 1;
        }
      }
    });

    console.log('Worker Job Count:', workerJobCount);

    this.pieChartOptions.series = Object.values(workerJobCount);
    this.pieChartOptions.labels = Object.keys(workerJobCount);

    console.log('Pie Chart Series:', this.pieChartOptions.series);
    console.log('Pie Chart Labels:', this.pieChartOptions.labels);
  }

  loadHistogramChartData(): void {
    const dayOfWeekJobCount: number[] = Array(7).fill(0);
    const dayOfWeekJobTotal: number[] = Array(7).fill(0);

    const now = new Date();
    const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

    this.allZakazivanjaFirme.forEach(z => {
      const jobDate = new Date(z.startDate!);
      if (jobDate >= twoYearsAgo && jobDate <= now) {
        const dayOfWeek = jobDate.getDay();
        dayOfWeekJobCount[dayOfWeek]++;
        dayOfWeekJobTotal[dayOfWeek] += 1;
      }
    });

    const averageJobsPerDay = dayOfWeekJobTotal.map((total, index) => total / (dayOfWeekJobCount[index] || 1));

    console.log('Average Jobs Per Day:', averageJobsPerDay);

    this.histogramChartOptions.series = [{
      name: 'Average Jobs',
      data: averageJobsPerDay
    }];
  }

  setSection(s: String) {
    this.currentSection = s
  }

  logout() {
    localStorage.removeItem("logged")
    this.router.navigate([''])
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    const img = new Image();
    img.onload = function () {
      const width = img.width;
      const height = img.height;
    }
    if (!(img.width < 100 && img.width > 300 && img.height < 100 && img.height > 300)) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.user.picture = reader.result;
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert("Slika mora biti dimenzija 100x100 do 300x300")
    }
  }

  saveChanges() {
    this.service.updateUser(this.user).subscribe(
      data => {
        if (data == 0) {
          alert("Uspesno ste izmenili podatke")
          this.ngOnInit()
        } else {
          alert("Doslo je do greske")
        }
      }
    )
  }

  potvrdi(z: Zakazivanje, username: String) {
    this.service.prihvatiZakazivanje(z, username).subscribe(
      data => {
        if (data == 0) {
          alert("Uspesno ste prihvatili zakazivanje")
          this.user.blokiran = 5
          this.service.updateUser(this.user)
          this.ngOnInit()
        } else {
          alert("Doslo je do greske")
        }
      }
    )
  }

  odbij(z: Zakazivanje) {
    if (this.komentar == '') {
      alert('Komentar za odbijanje je obavezan')
      return
    }
    z.komentar = this.komentar.toString()
    this.service.odbijZakazivanje(z).subscribe(
      data => {
        if (data == 0) {
          alert("Uspesno ste odbili zakazivanje")
          this.ngOnInit()
        } else {
          alert("Doslo je do greske")
        }
      }
    )
  }

  zavrsi(z: Zakazivanje) {
    this.service.zavrsiZakazivanje(z).subscribe(
      data => {
        if (data == 0) {
          alert("Uspesno ste zavrsili zakazivanje")
          this.ngOnInit()
        } else {
          alert("Doslo je do greske")
        }
      }
    )
  }

  potvrdiServis(z: Zakazivanje) {
    if (this.date == null) {
      alert('Datum zavrsetka servisa je obavezan')
      return
    }
    this.service.prihvatiServis(z, this.date!).subscribe(
      data => {
        if (data == 0) {
          alert("Uspesno ste prihvatili zakazivanje")
          this.ngOnInit()
        } else {
          alert("Doslo je do greske")
        }
      }
    )
  }

  odbijServis(z: Zakazivanje) {
    this.service.odbijServis(z).subscribe(
      data => {
        if (data == 0) {
          alert("Uspesno ste odbili zakazivanje")
          this.ngOnInit()
        } else {
          alert("Doslo je do greske")
        }
      }
    )
  }

  getBrojPoslovaPoMesecima(zakazivanja: Zakazivanje[], username: string): number[] {
    const meseciBrojPoslova = Array(12).fill(0);
    zakazivanja.forEach(zakazivanje => {
      if (zakazivanje.dekorater === username) {
        const datum = new Date(zakazivanje.startDate!);
        const mesec = datum!.getMonth();
        meseciBrojPoslova[mesec] += 1;
      }
    });
    return meseciBrojPoslova;
  }
}
