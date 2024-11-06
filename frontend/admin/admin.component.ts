import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Firma } from '../models/firma'
import { Usluga } from '../models/usluga';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{


  currentSection: String = ""

  constructor(private route: ActivatedRoute,private router: Router, private service: UserService){}


  zahtevi: User[] = []
  vlasnici: User[] = []
  dekorateri: User[] = []
  user: User = new User()
  moguciDekorateri: String[] = []



  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.currentSection = data['section'] || 'zahtevi';
    });
    this.service.getUsers(1).subscribe(
      data=>{
        this.zahtevi = data
      }
    )
    this.service.getUsers(0).subscribe(
      data=>{
        this.vlasnici = data
      }
    )
    this.service.getRadniks().subscribe(
      data=>{
        this.dekorateri = data
        for(let d of this.dekorateri){
      if(d.blokiran != 4){
        this.moguciDekorateri.push(d.username)
      }
    }
      }
    )

  }

  logout() {
    localStorage.removeItem("logged");
    this.router.navigate(['adminlogin']);
  }

  prihvati(username: String){
    this.service.prihvati(username).subscribe(
      data=>{
        if(data == 0){
          alert("User accepted")
          this.ngOnInit()
        }
        else{
          alert("Error")
        }
      }
    )
  }

  odbij(username: String){
    this.service.odbij(username).subscribe(
      data=>{
        if(data == 0){
          alert("User rejected")
          this.ngOnInit()
        }
        else{
          alert("Error")
        }
      }
    )
  }
  address1: String = ""
  phone_number1: String = ""
  credit_card_number1: String = ""
  mail1: String = ""

  updateUser(){
    this.user = JSON.parse(localStorage.getItem("user1")??"")
    if(this.address1)this.user.address = this.address1
    if(this.phone_number1)this.user.phone_number = this.phone_number1
    if(this.credit_card_number1)this.user.credit_card_number = this.credit_card_number1
    if(this.mail1)this.user.mail = this.mail1

    this.service.updateUser(this.user).subscribe(
      data=>{
        if(data == 0){
          alert("User updated")
          this.ngOnInit()
        }
        else{
          alert("Error")
        }
      }
    )
  }

  odbaci(){

  }

  zapamti(u: User){
    localStorage.setItem("user1",JSON.stringify(u))
    this.router.navigate(['/azurirajKorisnika'])
  }

  username: String = ""
  password: String = ""
  name: String = ""
  lastname: String = ""
  email: String = ""
  phone: String = ""
  address: String = ""
  type: String = "dekorater"
  gender: String = ""
  creditCard: String = ""
  //picture: Buffer|String = ""
  message: String = ""
  //file: File|String = ""
  imagePreview: String | ArrayBuffer | null = null;
  slikaKartice: String | null = null


  onFileChange(event: any): void {
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
                this.imagePreview = reader.result; // This will be a data URL
                //this.uploadImage(reader.result as string);
              };

              reader.readAsDataURL(file); // Converts the file to a base64 encoded string
            }
      }
      else{
        alert("Slika mora biti dimenzija 100x100 do 300x300")
      }

    }


    kartica(){
      const regexDiner = /(300|301|302|303|36\d|38\d)\d{12}$/
      const regexMaster = /^(51|52|53|54|55)\d{14}$/
      const regexVisa = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
      if(this.creditCard){
        if(regexDiner.test(this.creditCard.toString())){
          this.slikaKartice = "assets/diners.png"
        }
        else if(regexMaster.test(this.creditCard.toString())){
          this.slikaKartice = "assets/mastercard.png"
        }
        else if(regexVisa.test(this.creditCard.toString())){
          this.slikaKartice = "assets/visa.png"
        }
        else{
         // this.slikaKartice = "assets/notgood.png"
        }
      }
    }
    register(){
      if(this.username=="" || this.password =="" || this.name=="" ||
      this.lastname=="" || this.email=="" || this.phone=="" || this.address=="" ||
      this.gender=="" || this.creditCard==""){
        this.message = "Morate popuniti sva polja"
      }
      else{

        const regex = /^[A-Z](?=(.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,9}$|^[a-z](?=(.*[a-z]){2,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/
        if(!regex.test(this.password.toString())){
          this.message = "Lozinka nije u dobrom formatu"
        }
        else{
          // if(this.imagePreview == null){
          //   this.imagePreview = "assets/anonimni.png"
          // }
          this.service.register(this.username,this.password,this.name,
          this.lastname,this.email,this.phone,this.address,
          this.type,this.gender,this.creditCard,this.imagePreview || "assets/anonimni.png").subscribe(
            data => {
              if(data == 0) {
                alert("User created succesfully")
                this.router.navigate(['admin'])
              }
              else this.message = "Korisnicko ime ili mejl su vec zauzeti"
            }
          );
        }
      }
    }

    firma: Firma = new Firma()
    usluga: Usluga = new Usluga()

    dodajFirmu(){
      if(this.firma.name == "" || this.firma.address == "" || this.firma.contact == "" ||
        this.firma.endDate == null || this.firma.startDate == null || this.firma.location == ""){
          alert('Morate popuniti sva polja')
          return
        }
      if(this.firma.workers.length < 2){
        alert('Firma mora da ima najmanje 2 dekoratera')
        return
      }
      else{
        this.service.dodajFirmu(this.firma).subscribe(
          data=>{
            if(data == 0){
              alert('Firma dodata')
              for(let w of this.firma.workers){
                this.service.zaposli(w).subscribe(
                  data=>{
                    if(data == 0){
                      console.log('zaposlen')
                    }
                    else{
                      console.log('greska')
                    }
                  }
                )
              }
              this.router.navigate(['admin'])
            }
            else{
              alert('Greska')
            }
          }
        )
      }
    }

    dodajUslugu(){
      if(this.usluga.name == ''){
        alert('Ne mozete dodati uslugu bez imena')
      }
      else{
        this.firma.services.push(this.usluga)
        this.usluga = new Usluga()
      }
    }

    toggleWorker(event: Event, dekorater: String) {
      const input = event.target as HTMLInputElement;


      if (input.checked) {
        this.firma.workers.push(dekorater);
      } else {
        this.firma.workers= this.firma.workers.filter(d => d !== dekorater);
      }
    }
}
