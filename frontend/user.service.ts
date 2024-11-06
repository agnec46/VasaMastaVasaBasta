import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Firma } from './models/firma';
import { Zakazivanje } from './models/zakazivanje';
//import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  login(username: String, password: String){
    const data = { username: username, password: password}
    return this.http.post<User>('http://localhost:4000/users/login', data);
  }

  register(username: String,password: String,name: String,
    lastname: String,email: String,phone: String,
    address: String,type: String,gender: String,creditCard: String,file: String | ArrayBuffer | null)
  {
    const data = { username: username, password: password, name: name,
      lastname: lastname, mail: email, phone_number: phone, type: type,
      address: address, gender: gender, credit_card_number: creditCard,
      picture: file
    }
    //console.log(file)
    return this.http.post<number>('http://localhost:4000/users/register', data)
  }

  getUser(username: String){
    const data = {
      username: username
    }
    return this.http.post<User>('http://localhost:4000/users/getUser',data)
  }

  updatePassword(user: User,n: String){
    const data = {
      user: user,
      n: n
    }
    return this.http.post<number>('http://localhost:4000/users/updatePassword',data)
  }

  updateUser(user: User){
    const data = {
      user: user
    }
    //console.log(user.phone_number)
    return this.http.post<number>('http://localhost:4000/users/updateUser',data)
  }

  getUsers(n: Number){
    const data = {
      n: n
    }
    return this.http.post<User[]>('http://localhost:4000/users/getUsers', data)
  }

  prihvati(username: String){
    const data = {
      username: username
    }
    return this.http.post<number>('http://localhost:4000/users/prihvati',data)
  }
  odbij(username: String){
    const data = {
      username: username
    }
    return this.http.post<number>('http://localhost:4000/users/odbij',data)
  }

  getRadniks(){
    return this.http.get<User[]>('http://localhost:4000/users/getRadniks')
  }

  dodajFirmu(firma: Firma){
    const data = {
      firma: firma
    }
    return this.http.post<number>('http://localhost:4000/users/dodajFirmu',data)
  }

  zaposli(w: String){
    const data = {
      w: w
    }
    return this.http.post<number>('http://localhost:4000/users/zaposli',data)
  }

  getFirme(){
    return this.http.get<Firma[]>('http://localhost:4000/users/getFirme')
  }

  zakazivanje(z: Zakazivanje){
    const data = {
      zakazivanje: z
    }
    return this.http.post<number>('http://localhost:4000/users/zakazivanje',data)
  }

  getZakazivanja(username: String){
    const data = {
      username: username
    }
    console.log(username)
    return this.http.post<Zakazivanje[]>('http://localhost:4000/users/getZakazivanja', data)
  }

  otkaziPosao(date: Date){
    const data = {
      date: date
    }
    return this.http.post<number>('http://localhost:4000/users/otkaziPosao',data)
  }

  zakazivanjaFirma(name: String){
    const data = {
      name: name
    }
    return this.http.post<Zakazivanje[]>('http://localhost:4000/users/zakazivanjaFirme',data)
  }

  prihvatiZakazivanje(z: Zakazivanje, username: String){
    const data = {
      z: z,
      username: username
    }
    return this.http.post<number>('http://localhost:4000/users/prihvatiZakazivanje',data)
  }

  odbijZakazivanje(z: Zakazivanje){
    const data = {
      z: z
    }
    return this.http.post<number>('http://localhost:4000/users/odbijZakazivanje',data)
  }

  getMojaZakazivanja(firma: String,user: String){
    const data = {
      firma: firma,
      user: user
    }
    //console.log(data)
    return this.http.post<Zakazivanje[]>('http://localhost:4000/users/getMojaZakazivanja',data)
  }

  zavrsiZakazivanje(z: Zakazivanje){
    const data = {
      z: z
    }
    return this.http.post<number>('http://localhost:4000/users/zavrsiZakazivanje',data)
  }

  zakaziServis(z: Zakazivanje){
    const data = {
      z: z
    }
    return this.http.post<number>('http://localhost:4000/users/zakaziServis',data)
  }

  getZakazivanjaServis(firma: String, username: String){
    const data = {
      firma: firma,
      username: username
    }
    return this.http.post<Zakazivanje[]>('http://localhost:4000/users/getZakazivanjaServis',data)
  }

  prihvatiServis(z: Zakazivanje,date: Date){
    const data = {
      z: z,
      date: date
    }
    return this.http.post<number>('http://localhost:4000/users/prihvatiServis',data)
  }

  odbijServis(z: Zakazivanje){
    const data = {
      z: z,
    }
    return this.http.post<number>('http://localhost:4000/users/odbijServis',data)
  }

  getAllZakazivanjaFirme(firma: String){
    const data = {
      firma: firma
    }
    return this.http.post<Zakazivanje[]>('http://localhost:4000/users/getAllZakazivanjaFirme',data)
  }

  getUsersByType(str: String){
    const data = {
      type: str
    }
    return this.http.post<User[]>('http://localhost:4000/users/getUsersByType',data)
  }

  getAllGotovaZakazivanja(){
    return this.http.get<Zakazivanje[]>('http://localhost:4000/users/getAllGotovaZakazivanja')
  }
}
