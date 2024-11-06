import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Firma } from '../models/firma';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit{

  constructor(private router: Router,private service: UserService){}

  brojBasta: Number = 0
  brojVlasnika: Number = 0
  brojDekoratera: Number = 0
  brojPoslova24: number = 0
  brojPoslova7: number = 0
  brojPoslova30:number = 0
  firme: Firma[] = []
  workerNames: { [key: string]: string } = {};
  sortField: string = '';
  sortOrder: string = 'asc';
  searchName: string = '';
  searchAddress: string = '';
  filteredFirme: Firma[] = [];


  ngOnInit(): void {
    this.service.getFirme().subscribe(
      data => {
        this.firme = data
        this.filteredFirme = this.firme
        this.service.getUsersByType("vlasnik").subscribe(
          data=>{
            this.brojVlasnika = data.length
          }
        )
        this.service.getUsersByType("dekorater").subscribe(
          data =>{
            this.brojDekoratera = data.length
          }
        )
        this.service.getAllGotovaZakazivanja().subscribe(
          data =>{
            this.brojBasta = data.length
            for(let d of data){
              console.log(this.isDateGreaterByDays(new Date(),d.startDate!,1))
              if(!this.isDateGreaterByDays(new Date(),d.date!,1)){

                this.brojPoslova24 = this.brojPoslova24 + 1
              }

              if(!this.isDateGreaterByDays(new Date(),d.date!,7)){
                console.log(this.isDateGreaterByDays(new Date(),d.startDate!,7))
                this.brojPoslova7 = this.brojPoslova7 + 1
              }
              if(!this.isDateGreaterByDays(new Date(),d.date!,30)){
                console.log(this.isDateGreaterByDays(new Date(),d.startDate!,30))
                this.brojPoslova30 = this.brojPoslova30 + 1
              }

            }
          }
        )

      }

    )

    console.log(this.filteredFirme)
  }

  getUserFullName(username: string): string {
    if (!this.workerNames[username]) {
      this.service.getUser(username).subscribe(user => {
        this.workerNames[username] = `${user.name} ${user.lastname}`;
      });
    }
    return this.workerNames[username] || 'Loading...';
  }

  toggleSort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.sortFirme();
  }

  sortFirme(): void {
    this.firme.sort((a, b) => {
      if (this.sortField === 'name') {
        if (a.name < b.name) {
          return this.sortOrder === 'asc' ? -1 : 1;
        } else if (a.name > b.name) {
          return this.sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      } else{
        if (a.address < b.address) {
          return this.sortOrder === 'asc' ? -1 : 1;
        } else if (a.address > b.address) {
          return this.sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }

    });
  }

  searchFirme(): void {
    this.filteredFirme = this.firme.filter(firma => {
      return (
        (!this.searchName || firma.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
        (!this.searchAddress || firma.address.toLowerCase().includes(this.searchAddress.toLowerCase()))
      );
    });

  }

  register(){
    this.router.navigate(['register'])
  }

  isDateGreaterByDays(date1: Date | string, date2: Date | string, days: number): boolean {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // milliseconds in one day

    // Convert inputs to Date objects if they are strings
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

    // Ensure both are valid Date objects
    if (!(d1 instanceof Date) || !(d2 instanceof Date) || isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        throw new Error('Invalid date input');
    }

    const differenceInMillis = d1.getTime() - d2.getTime();
    return differenceInMillis > days * millisecondsPerDay;
  }
}
