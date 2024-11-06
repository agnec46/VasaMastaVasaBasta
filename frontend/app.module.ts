import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RadnikComponent } from './radnik/radnik.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegisterComponent } from './register/register.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FirmaComponent } from './firma/firma.component'
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RadnikComponent,
    VlasnikComponent,
    PocetnaComponent,
    RegisterComponent,
    PromenaLozinkeComponent,
    AdminLoginComponent,
    FirmaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
