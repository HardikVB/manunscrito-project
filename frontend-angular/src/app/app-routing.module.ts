import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { StorePage } from './pages/store-page/store-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { LogoutPage } from './pages/logout-page/logout-page.page';


const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'store', component: StorePage },
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
