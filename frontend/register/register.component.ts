import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private service: UserService, private router: Router) { }


  username: String = ""
  password: String = ""
  name: String = ""
  lastname: String = ""
  email: String = ""
  phone: String = ""
  address: String = ""
  type: String = "vlasnik"
  gender: String = ""
  creditCard: String = ""
  //picture: Buffer|String = ""
  message: String = ""
  //file: File|String = ""
  imagePreview: String | ArrayBuffer | null = null;
  slikaKartice: String | null = null

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
              this.router.navigate(['login'])
            }
            else this.message = "Korisnicko ime ili mejl su vec zauzeti"
          }
        );
      }
    }
  }


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
        this.slikaKartice = "assets/notgood.png"
      }
    }
  }
}


