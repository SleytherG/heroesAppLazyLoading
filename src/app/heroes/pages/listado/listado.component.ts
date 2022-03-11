import { Component, OnInit } from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {Heroe} from "../../models/heroe.model";
import {debounceTime} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Auth} from "../../../auth/interfaces/auth.interface";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];
  auth: Auth | undefined;

  constructor(
    private heroesService: HeroesService,
  ) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .pipe(
        debounceTime(2000)
      )
      .subscribe((heroe) => {
        this.heroes = heroe;
      });

  }

}
