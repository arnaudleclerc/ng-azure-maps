import { Directive } from '@angular/core';
import { Map } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';
import { ControlDirective } from './control.directive';

@Directive({
  selector: '[zoom-control], zoom-control'
})
export class ZoomControlDirective
  extends ControlDirective {

  public initialize(map: Map): void {
    map.controls.add(new atlas.control.ZoomControl(), {
      position: this.position
    });
  }

}
