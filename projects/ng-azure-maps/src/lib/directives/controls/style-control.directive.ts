import { Directive, Input } from '@angular/core';
import { ControlDirective } from './control.directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[map-style-control], map-style-control'
})
export class StyleControlDirective
  extends ControlDirective {

  @Input()
  public layout: 'icons' | 'list';

  @Input()
  public mapStyles: string[] | 'all';

  @Input()
  public controlStyle: atlas.ControlStyle;

  public initialize(map: atlas.Map): void {
    map.controls.add(new atlas.control.StyleControl({
      layout: this.layout,
      mapStyles: this.mapStyles,
      style: this.controlStyle
    }), {
      position: this.position
    });
  }

}
