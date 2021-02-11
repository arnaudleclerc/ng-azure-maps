import { Directive } from '@angular/core';
import { ControlDirective } from './control.directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[map-pitch-control], map-pitch-control'
})
export class PitchControlDirective
  extends ControlDirective {

  public initialize(map: atlas.Map): void {
    map.controls.add(new atlas.control.PitchControl(), {
      position: this.position
    });
  }

}
