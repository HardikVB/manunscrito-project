import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { StorePage } from './pages/store-page/store-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { LogoutPage } from './pages/logout-page/logout-page.page';
import { NotFoundPage } from './pages/not-found-page/note-found-page.component';
import { LanguageGuard } from './service/language-guard';
import { RegisterPage } from './pages/register-page/register-page.component';
import { SinglePageProduct } from './pages/single-page-product/single-page-product.component';
import { DashboardPage } from './pages/dashboard-page/dashboard-page.component';
import { SuccessPage } from './pages/success-page/success-page.component';

const routes: Routes = [
  { path: ':language/success', component: SuccessPage, canActivate: [LanguageGuard] },
  { path: ':language/dashboard', component: DashboardPage, canActivate: [LanguageGuard] },
  { path: ':language/home', component: HomePage, canActivate: [LanguageGuard] },
  { path: ':language/register', component: RegisterPage, canActivate: [LanguageGuard] },
  { path: ':language/store', component: StorePage, canActivate: [LanguageGuard] },
  { path: ':language/store/:id', component: SinglePageProduct, canActivate: [LanguageGuard] },
  { path: ':language/login', component: LoginPage, canActivate: [LanguageGuard] },
  { path: ':language/logout', component: LogoutPage, canActivate: [LanguageGuard] },
  { path: ':language', redirectTo: ':language/home', pathMatch: 'full' },
  { path: '', component: HomePage }, // Default to English if no language is specified
  { path: '**', component: NotFoundPage } // 404 route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
