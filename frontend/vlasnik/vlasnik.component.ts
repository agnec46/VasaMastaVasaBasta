import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Firma } from '../models/firma';
import { Zakazivanje } from '../models/zakazivanje';

@Component({
  selector: 'app-vlasnik',
  templateUrl: './vlasnik.component.html',
  styleUrls: ['./vlasnik.component.css']
})
export class VlasnikComponent implements OnInit {
  constructor(private router: Router, private service: UserService, private route: ActivatedRoute){}

  user: User = new User()
  currentSection: String = "Profil"
  firme: Firma[] = []
  filteredFirme: Firma[] = []
  sortField: string = '';
  sortOrder: string = 'asc';
  searchName: string = '';
  searchAddress: string = '';
  workerNames: { [key: string]: string } = {};
  zakazivanja: Zakazivanje[] = []
  novaZakazivanja: Zakazivanje [] = []
  gotovaZakazivanja: Zakazivanje [] = []
  zakazivanjaUtoku: Zakazivanje [] = []
  newDate: Date | null = null
  zakazaniServisi: Zakazivanje[] = []

  setSection(s: String){
    this.currentSection = s
  }

  ngOnInit(): void {
    const djerdap = String(localStorage.getItem("logged"))
    //console.log(djerdap)

    this.service.getUser(djerdap).subscribe(
      data=>{
        this.user = data
      }
    )
    this.route.data.subscribe(data => {
      this.currentSection = data['section'] || 'profil';
    });
    this.service.getFirme().subscribe(
      data => {
        this.firme = data
        this.filteredFirme = data
      }
    )
    this.service.getZakazivanja(djerdap).subscribe(
      data => {
        this.zakazivanja = data
        console.log(this.zakazivanja)
        for(let z of this.zakazivanja){
          if(z.status == 0){
            this.novaZakazivanja.push(z)
          }
          if(z.status == 1){
            this.gotovaZakazivanja.push(z)
          }
          if(z.status == 2){
            this.zakazivanjaUtoku.push(z)
          }
          if(z.poslednjeOdrzavanje! > new Date() || z.odrzavanje == 1){
            this.zakazaniServisi.push(z)
          }
        }
      }
    )
    this.newDate = new Date()
  }

  logout(){
    localStorage.removeItem("logged")
    this.router.navigate([''])
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
  const img = new Image();
    img.onload = function() {
        const width = img.width;
        const height = img.height;
    }
    if (!(img.width < 100 && img.width > 300 && img.height < 100 && img.height > 300)){
      if (file) {
            const reader = new FileReader();

            // Read file as Base64 string
            reader.onloadend = () => {
              this.user.picture = reader.result; // This will be a data URL
              //this.uploadImage(reader.result as string);
            };

            reader.readAsDataURL(file); // Converts the file to a base64 encoded string
          }
    }
    else{
      alert("Slika mora biti dimenzija 100x100 do 300x300")
    }
  }

  saveChanges(){
    this.service.updateUser(this.user).subscribe(
      data=>{
        if(data == 0){
          alert("Uspesno ste izmenili podatke")
          this.ngOnInit()
        }
        else{
          alert("Doslo je do greske")
        }

      }
    )
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
    this.filteredFirme.sort((a, b) => {
      if (this.sortField === 'name') {
        if (a.name < b.name) {
          return this.sortOrder === 'asc' ? -1 : 1;
        } else if (a.name > b.name) {
          return this.sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      } else {
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
    })
    this.sortFirme(); // Ensure the filtered results are sorted
  }
selected: Firma = new Firma()

  firmaSelected(firma: Firma){
    if(this.selected == firma){
      this.selected = new Firma()
      return
    }
    this.selected = firma
  }

  firmaNavigate(){
    localStorage.setItem('firma',JSON.stringify(this.selected))
    this.router.navigate(['/djerdap']);
  }



  otkaziPosao(date: Date){
    this.service.otkaziPosao(date).subscribe(
      data=>{
        if(data == 0){
          alert("Uspesno ste otkazali posao")
          this.novaZakazivanja = []
          this.ngOnInit()
        }
        else{
          alert("Doslo je do greske")
      }
    })
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

  zakaziServis(z: Zakazivanje){
    if(z.odrzavanje == 1 || z.poslednjeOdrzavanje! > new Date()){
      alert('Servis je vec zakazan')
      return
    }
    this.service.zakaziServis(z).subscribe(
      data=>{
        if(data == 0){
          alert("Uspesno ste zakazali servis")
          this.gotovaZakazivanja = []
          this.zakazaniServisi = []
          this.ngOnInit()
        }
        else{
          alert("Doslo je do greske")
        }
      }
    )
  }

}
