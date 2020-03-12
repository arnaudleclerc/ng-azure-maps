import { ControlDirective } from './control.directive';
import { Directive } from '@angular/core';
import { Map } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[compass-control], compass-control'
})
export class CompassControlDirective
  extends ControlDirective {

  public initialize(map: Map): void {
    map.controls.add(new atlas.control.CompassControl(), {
      position: this.position
    });
  }

}
