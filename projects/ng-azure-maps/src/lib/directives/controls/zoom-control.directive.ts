import { Directive, Input } from '@angular/core';
import * as atlas from 'azure-maps-control';
import { ControlDirective } from './control.directive';

@Directive({
    selector: '[map-zoom-control], map-zoom-control',
    standalone: false
})
export class ZoomControlDirective
  extends ControlDirective {

  @Input()
  public zoomDelta: number;

  @Input()
  public controlStyle: atlas.ControlStyle;

  public initialize(map: atlas.Map): void {
    map.controls.add(new atlas.control.ZoomControl({
      zoomDelta: this.zoomDelta,
      style: this.controlStyle
    }), {
      position: this.position
    });
  }

}
