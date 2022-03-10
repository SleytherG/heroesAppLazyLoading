import {Pipe, PipeTransform} from "@angular/core";
import {Heroe} from "../models/heroe.model";

@Pipe({
  name: 'imagen'
})


export class ImagePipe implements PipeTransform {

  transform(heroe: Heroe) : string {
      if ( heroe.id ) {
        return `assets/heroes/${ heroe.id }.jpg`;
      } else {
        return `assets/heroes/no-image.png`;
      }
  }
}
