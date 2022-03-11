import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Auth} from "../../auth/interfaces/auth.interface";
import {map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl: string = environment.apiUrl;
  private _auth!: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(
    private http: HttpClient
  ) {
  }

  verificaAutenticacion(): Observable<boolean> {

    if ( !localStorage.getItem( 'token' ) ) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.apiUrl}/usuarios/1`)
      .pipe(
       map( auth => {
         this._auth = auth;
         console.log('map', auth);
         return true;
       })
      )
  }

  login() {
    return this.http.get<Auth>(`${this.apiUrl}/usuarios/1`)
      .pipe(
        tap( {
          next: (auth) => {
            this._auth = auth;
            console.log(this._auth);
          }
        }),
          tap( auth => localStorage.setItem( 'token', auth.id ))
      );
  }

  logout() {
    this._auth = undefined;
  }

}
