import { ControlDirective } from './control.directive';
import { Directive, Input } from '@angular/core';
import * as azMaps from 'azure-maps-control';

declare const atlas;
atlas.math = azMaps.math;

@Directive({
  selector: '[map-scalebar-control], map-scalebar-control'
})
export class ScaleBarControlDirective
  extends ControlDirective {

  @Input()
  public maxBarLength: number;

  @Input()
  public units: 'imperial' | 'metric' | 'meters' | 'kilometers' | 'yards' | 'feet' | 'miles' | 'nauticalMiles';

  public initialize(map: azMaps.Map): void {
    const controlParameters: any = {};
    if (this.maxBarLength) {
      controlParameters.maxBarLength = this.maxBarLength;
    }
    if (this.units) {
      controlParameters.units = this.units;
    }
    map.controls.add(new atlas.control.ScaleBarControl(controlParameters), {
      position: this.position
    });
  }

}
