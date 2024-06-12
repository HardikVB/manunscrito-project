import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const language = route.paramMap.get('language');
    const validLanguages = ['en', 'pt', 'es']; // Adicione aqui os idiomas válidos
    if(language == null) {
        return this.router.createUrlTree(['/pt/404-not-found']); // ou para outra rota padrão
    }

    if (validLanguages.includes(language)) {
      return true;
    } else {
      // Redireciona para a página padrão se o idioma não for válido
      return this.router.createUrlTree(['/pt/404-not-found']); // ou para outra rota padrão
    }
  }
}
