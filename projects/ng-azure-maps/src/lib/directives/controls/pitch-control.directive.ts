import { Directive } from '@angular/core';
import { ControlDirective } from './control.directive';
import { Map } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[pitch-control], pitch-control'
})
export class PitchControlDirective
  extends ControlDirective {

  public initialize(map: Map): void {
    map.controls.add(new atlas.control.PitchControl(), {
      position: this.position
    });
  }

}
