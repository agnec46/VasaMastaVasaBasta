import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AdminComponent } from './admin/admin.component';
import { RadnikComponent } from './radnik/radnik.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { RegisterComponent } from './register/register.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FirmaComponent } from './firma/firma.component';

const routes: Routes = [
  { path:"", component: PocetnaComponent},
  { path:"login", component: LoginComponent},
  { path:"admin",component: AdminComponent},
  { path:"radnik", component: RadnikComponent},
  { path:"vlasnik", component: VlasnikComponent},
  { path:"register", component: RegisterComponent},
  { path:"promenaLozinke",component: PromenaLozinkeComponent},
  { path: 'profil', component: VlasnikComponent, data: { section: 'profil' } },
  { path: 'firme', component: VlasnikComponent, data: { section: 'firme' } },
  { path: 'zakazivanja', component: VlasnikComponent, data: { section: 'zakazivanja' } },
  { path: 'promenaLozinke', component: VlasnikComponent, data: { section: 'promenaLozinke' } },
  { path: 'odrzavanje', component: VlasnikComponent, data: { section: 'odrzavanje'} },
  { path: 'profils', component: RadnikComponent, data: { section: 'profils' } },
  { path: 'zakazivanjas', component: RadnikComponent, data: { section: 'zakazivanjas' } },
  { path: 'promenaLozinke', component: VlasnikComponent, data: { section: 'promenaLozinke' } },
  { path: 'odrzavanjes', component: RadnikComponent, data: { section: 'odrzavanjes'} },
  { path: 'statistika', component: RadnikComponent, data: { section: 'statistika'} },
  { path:'adminlogin',component: AdminLoginComponent},
  { path: 'zahtevi', component: AdminComponent, data: { section: 'zahtevi' } },
  { path: 'korisnici', component: AdminComponent, data: { section: 'korisnici' } },
  { path: 'admin-firme', component: AdminComponent, data: { section: 'admin-firme' } },
  { path: 'dekorateri', component: AdminComponent, data: { section: 'dekorateri' } },
  { path: 'azurirajKorisnika', component: AdminComponent, data: { section: 'azurirajKorisnika'}},
  { path:'djerdap', component: FirmaComponent},
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
