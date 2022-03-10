import {Component, OnInit} from '@angular/core';

import {HeroesService} from '../../services/heroes.service';
import {Heroe, Publisher} from "../../models/heroe.model";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel Comics'},
  ];

  heroe: Heroe = {
    id: '',
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
    characters: ''
  };

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    console.log(this.heroe);
  }

  guardar() {
    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    }
    console.log(this.heroe);
    this.heroesService.agregarHeroe( this.heroe )
      .subscribe( resp => {
        console.log('Respuesta', resp);
      });
  }

}
