import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private service: UserService, private router: Router) { }

  username: String = ""
  password: String = ""
  message: String = ""
  user: User = new User()


  login(){
    this.service.login(this.username,this.password).subscribe(
      data=>{
        if(data == null){
          this.message="Pogresno uneti podaci"
        }
        else{
          this.user = data
          localStorage.setItem("logged",String(this.user.username))
          if(this.user.type=="admin")
            this.router.navigate(['admin'])
          else {
            alert("Samo admin moze da se uloguje ovde")
          }
        }
      }
    )
  }
}
