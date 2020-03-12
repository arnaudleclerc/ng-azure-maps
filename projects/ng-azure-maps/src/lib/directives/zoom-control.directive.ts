import { Directive, Input } from '@angular/core';
import { Map, ControlPosition } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[zoom-control]'
})
export class ZoomControlDirective {

  @Input() public position: ControlPosition;

  public initialize(value: Map) {
    value.controls.add(new atlas.control.ZoomControl(), {
      position: this.position
    });
  }

}
