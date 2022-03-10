import { Component, OnInit } from '@angular/core';
import {Heroe} from "../../models/heroe.model";
import {HeroesService} from "../../services/heroes.service";
import {debounceTime} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  termino: string= '';
  heroes: Heroe[] = [];

  heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  buscando() {
    console.log(this.termino);
    this.heroesService.getSugerencias( this.termino.trim() )
      .pipe(
        debounceTime(2000),
      )
      .subscribe(heroes => this.heroes = heroes);
    console.log(this.heroes);
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if ( event.option.value === '') {
      this.heroeSeleccionado = undefined;
      console.log('no hay valor')
      return;
    } else {
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;
      console.log(heroe);
      this.heroesService.getHeroeById( heroe.id! )
        .subscribe( heroe => this.heroeSeleccionado = heroe);
    }
  }

  limpiarInput() {
    this.termino = '';
    this.heroes = [];
  }

}
