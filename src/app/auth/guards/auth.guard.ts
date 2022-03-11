import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../../heroes/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    // if ( this.authService.auth.id ) {
    //   return true
    // }
    // console.log('BLOQUEADO POR EL AUTHGUARD - CanActivate');
    // return false;
    return this.authService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado ) {
            this.router.navigate(['./auth/login']);
          }
        })
      );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificaAutenticacion().pipe(
      tap( estaAutenticado => {
        if (!estaAutenticado ) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    // if ( this.authService.auth.id ) {
    //   return true
    // }
    // console.log('BLOQUEADO POR EL AUTHGUARD - CanLoad');
    // return false;
  }
}
