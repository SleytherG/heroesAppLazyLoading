import {Component, OnInit} from '@angular/core';

import {HeroesService} from '../../services/heroes.service';
import {Heroe, Publisher} from "../../models/heroe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../components/confirm/confirm.component";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
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

  mensaje: string = 'Nuevo';

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if ( !this.router.url.includes('editar') ) {
      return;
    }
    // if ( this.router.url.includes('editar')) {
    //   this.mensaje = 'Editar';
    // } else {
    //   this.mensaje = 'Nuevo';
    // }
      this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroesService.getHeroeById( id ))
        )
        .subscribe( (heroe: Heroe)  => {
          if (heroe.id) {
            console.log('HEROE ID', heroe.id)
            this.heroe = heroe;
          }
        });
    // this.activatedRoute.params
    //   .subscribe(({ id }) => {
    //     if (id) {
    //       this.heroesService.getHeroeById( id )
    //         .subscribe( heroe => {
    //           this.heroe = heroe;
    //         })
    //     }
    //   })


  }

  guardar() {
    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    }
    if (this.heroe.id) {
      // Actualizar
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( (heroe) => {
          console.log('Actualizando', heroe);
          this.mostrarSnackBar('Registro Actualizado');
          // this.router.navigate(['/heroes/listado'])
        });
    } else {
      // Crear
    this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        console.log('Respuesta', heroe);
          this.mostrarSnackBar('Registro Creado Exitosamente');
          this.router.navigate(['/heroes/editar', heroe.id ])
      });
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open( ConfirmComponent, {
      width: '250px',
      // data: {...this.heroe}
      data: this.heroe
    });
    dialog.afterClosed().subscribe(
      result => {
        if ( result ) {
        this.heroesService.borrarHeroe( this.heroe.id! )
          .subscribe( resp => {
            this.router.navigate(['/heroes']);
            this.mostrarSnackBar('Heroe Eliminado Exitosamente.');
          });
        }

      }
    )

  }

  mostrarSnackBar( mensaje: string ) {
    this.snackBar.open( mensaje, 'Cerrar', {
      duration: 2500,
      // data: {...this.heroe}
      data: this.heroe
    });
  }

}
