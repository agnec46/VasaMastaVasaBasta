import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit{
  constructor(private service: UserService,private router: Router) { }

  user: User = new User()
  oldPassword: String = ""
  newPassword: String = ""
  confirmPassword: String = ""
  message: String = ""

  ngOnInit(): void {
    let djerdap = localStorage.getItem("logged")
    this.service.getUser(String(djerdap)).subscribe(
      data=>{
        this.user = data
      }
    )
  }

  potvrdi(){
    if(this.oldPassword=="" || this.newPassword=="" || this.confirmPassword ==""){
      this.message = "Niste uneli sve podatke"
    }
    const regex = /^[A-Z](?=(.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,9}$|^[a-z](?=(.*[a-z]){2,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/
    if(!regex.test(this.newPassword.toString())){
      this.message = "Nova lozinka nije u dobrom formatu"
    }
    else{
      if(this.newPassword != this.confirmPassword){
        this.message = "Lozinke se ne poklapaju"
      }
      else{

        this.message=""
        this.service.updatePassword(this.user,this.newPassword).subscribe(
          data=>{
            if(data == 0) {
              alert("Lozinka uspesno promenjena")
              this.router.navigate(['login'])
            }
            else alert("Doslo je do greske")
          }
        )
      }
    }
  }

  goBack(){
    this.router.navigate(['vlasnik'])
  }

}
