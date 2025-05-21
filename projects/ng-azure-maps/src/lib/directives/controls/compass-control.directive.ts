import { ControlDirective } from './control.directive';
import { Directive, Input } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Directive({
    selector: '[map-compass-control], map-compass-control',
    standalone: false
})
export class CompassControlDirective
  extends ControlDirective {

  @Input()
  public rotationDegreesDelta: number;

  @Input()
  public controlStyle: atlas.ControlStyle;

  public initialize(map: atlas.Map): void {
    map.controls.add(new atlas.control.CompassControl({
      rotationDegreesDelta: this.rotationDegreesDelta,
      style: this.controlStyle
    }), {
      position: this.position
    });
  }

}
