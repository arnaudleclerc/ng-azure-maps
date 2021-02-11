import { Directive } from '@angular/core';
import * as atlas from 'azure-maps-control';
import { ControlDirective } from './control.directive';

@Directive({
  selector: '[map-zoom-control], map-zoom-control'
})
export class ZoomControlDirective
  extends ControlDirective {

  public initialize(map: atlas.Map): void {
    map.controls.add(new atlas.control.ZoomControl(), {
      position: this.position
    });
  }

}
