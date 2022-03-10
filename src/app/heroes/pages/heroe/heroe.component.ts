import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Heroe} from "../../models/heroe.model";
import {HeroesService} from "../../services/heroes.service";
import {debounceTime, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // id del heroe y mostrarlo en consola
    this.activatedRoute.params
      .pipe(
        debounceTime(500),
        tap(console.log),
        switchMap(({id}) => this.heroesService.getHeroeById( id)),
        tap(console.log)
      )
      .subscribe({
        next: ( heroe) => {
          this.heroe = heroe;
        }
        }
      )
  }

  getHeroe( id : string) {
    this.heroesService.getHeroeById( id )
      .subscribe(
        heroe => {
          this.heroe = heroe;
          console.log('HEROE', this.heroe);
        }
      )
  }
  regresar() {
    this.router.navigate(['/heroes/listado']);
  }


}
