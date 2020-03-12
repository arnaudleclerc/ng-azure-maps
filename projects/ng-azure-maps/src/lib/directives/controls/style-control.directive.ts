import { Directive } from '@angular/core';
import { ControlDirective } from './control.directive';
import { Map } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[style-control], style-control'
})
export class StyleControlDirective
  extends ControlDirective {

  public initialize(map: Map): void {
    map.controls.add(new atlas.control.StyleControl(), {
      position: this.position
    });
  }

}
