import { Directive } from '@angular/core';
import { ControlDirective } from './control.directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[map-style-control], map-style-control'
})
export class StyleControlDirective
  extends ControlDirective {

  public initialize(map: atlas.Map): void {
    map.controls.add(new atlas.control.StyleControl(), {
      position: this.position
    });
  }

}
