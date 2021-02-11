import { ControlDirective } from './control.directive';
import { Directive } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[map-compass-control], map-compass-control'
})
export class CompassControlDirective
  extends ControlDirective {

  public initialize(map: atlas.Map): void {
    map.controls.add(new atlas.control.CompassControl(), {
      position: this.position
    });
  }

}
