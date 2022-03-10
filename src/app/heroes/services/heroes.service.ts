import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Heroe} from "../models/heroe.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiUrl: string = environment.apiUrl


  constructor(
    private http: HttpClient
  ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>( `${this.apiUrl}/heroes` );
  }

  getHeroeById( id: string ): Observable<Heroe> {
    return this.http.get<Heroe>( `${this.apiUrl}/heroes/${ id }` )
  }

  getSugerencias( termino: string) : Observable<Heroe[]> {
    const httpParams = new HttpParams()
      .set('q', termino)
      .set('_limit', 6);
    // httpParams.set('q', termino);
    // httpParams.set('_limit', 6);
    return this.http.get<Heroe[]>(`${this.apiUrl}/heroes`, { params: httpParams});
  }

  agregarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.post<Heroe>(`${ this.apiUrl }/heroes`, heroe);
  }
}
