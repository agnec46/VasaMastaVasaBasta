import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firma } from '../models/firma';
import { Usluga } from '../models/usluga';
import { Zakazivanje } from '../models/zakazivanje';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit{

  constructor(private router: Router,private service: UserService){}

  firma: Firma = new Firma()
  zakazivanje: Zakazivanje = new Zakazivanje()
  prviKorak: Boolean = false
  dostupanRadnik: Boolean = false

  ngOnInit(): void {
    let djerdap = localStorage.getItem('firma')
    if(djerdap)
      this.firma = JSON.parse(djerdap)
    //console.log(this.firma)
    for(let w of this.firma.workers){
      this.service.getUser(w).subscribe(
        data =>{
        if(data.blokiran == 4)
            this.dostupanRadnik = true
        }
      )
      }
    this.zakazivanje.firmaName = this.firma.name.toString()
    let a = localStorage.getItem('logged')
    if(a){
      this.zakazivanje.vlasnik = a
    }
  }

  onSubmit(){
    if(this.zakazivanje.startDate == null ||
        this.zakazivanje.kvadratura == 0 ||
        this.zakazivanje.tip == ''){
          alert('Morate popuniti sva polja')
          return
        }
    this.prviKorak = true
  }

  logout(){
    localStorage.removeItem("logged")
    this.router.navigate([''])
  }

  checkbox(service: Usluga){
    const index = this.zakazivanje.services.findIndex(s => s.name === service.name);
        if (index === -1) {
            this.zakazivanje.services.push(service); // Add service if not already selected
        } else {
            this.zakazivanje.services.splice(index, 1); // Remove service if already selected
        }
  }

  sendZakazivanje(){
    console.log(this.dostupanRadnik)
    if(this.zakazivanje.tip == "restoran"){
      if(this.zakazivanje.povrsinaFontane + this.zakazivanje.povrsinaZelenilo > this.zakazivanje.kvadratura){
        alert('Povrsina fontane i zelenila ne moze biti veca od kvadrature')
        return
      }
    }
    else{
      if(this.zakazivanje.povrsinaBazena + this.zakazivanje.povrsinaLezaljke + this.zakazivanje.povrsinaZelenilo> this.zakazivanje.kvadratura){
        alert('Povrsina bazena, zelenila i  lezaljki ne moze biti veca od kvadrature')
        return
      }
    }
    if(this.zakazivanje.date != null && this.firma.startDate != null && this.firma.endDate !=null){
      if(this.zakazivanje.date > this.firma.startDate && this.zakazivanje.date < this.firma.endDate){
        alert('Firma je na odmoru u tom terminu')
        return
      }
      if(this.zakazivanje.startDate && this.zakazivanje.startDate < this.zakazivanje.date){
        alert('Pogresan datum pocetka')
        return
      }
    }

    if(!this.dostupanRadnik){
      alert('Firma trenutno nema dostupnih radnika')
      return
    }
    this.zakazivanje.date = new Date()
    this.service.zakazivanje(this.zakazivanje).subscribe(
      data =>{
        if(data == 0){
          alert('Uspesno ste zakazali termin')
          this.router.navigate(['vlasnik'])
        }
        else{
          alert('Doslo je do greske')
        }
      }
    )
  }

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          this.zakazivanje.basta = JSON.parse(result);
          console.log(this.zakazivanje.basta)
          const gardenData = JSON.parse(result);
          this.renderGardenDesign(gardenData);
        }
      };
      reader.readAsText(file);
    }

  }
  renderGardenDesign(gardenData: any): void {
    const canvas = <HTMLCanvasElement>document.getElementById('gardenCanvas');
    const ctx = canvas.getContext('2d');

    if (ctx && gardenData) {
      // Clear previous design
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Example: Drawing elements from the JSON
      gardenData.elements.forEach((element: any) => {
        ctx.fillStyle = element.color || 'green'; // Default color
        ctx.fillRect(element.x, element.y, element.width, element.height);
      });
    }
  }

  nazad(){
    localStorage.removeItem('firma')
    this.router.navigate(['vlasnik'])
  }

}
