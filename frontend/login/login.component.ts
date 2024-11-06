import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
            alert("Admin ne moze da se uloguje ovde")
          else if(this.user.type=="vlasnik")
            this.router.navigate(['vlasnik'])
          else this.router.navigate(['radnik'])
        }
      }
    )
  }
}
