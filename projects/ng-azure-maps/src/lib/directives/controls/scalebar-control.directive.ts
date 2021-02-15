import { ControlDirective } from './control.directive';
import { Directive, Input } from '@angular/core';
import * as azMaps from 'azure-maps-control';

declare const atlas;

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
    map.controls.add(new atlas.control.ScaleBarControl(), {
      position: this.position
    });
  }

}
