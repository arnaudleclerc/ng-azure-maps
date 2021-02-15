import { Directive, Input } from '@angular/core';
import { ControlDirective } from './control.directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[map-pitch-control], map-pitch-control'
})
export class PitchControlDirective
  extends ControlDirective {

  @Input()
  public pitchDegreesDelta: number;

  @Input()
  public controlStyle: atlas.ControlStyle;

  public initialize(map: atlas.Map): void {
    map.controls.add(new atlas.control.PitchControl({
      pitchDegreesDelta: this.pitchDegreesDelta,
      style: this.controlStyle
    }), {
      position: this.position
    });
  }

}
