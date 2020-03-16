import { Directive, Input, OnChanges, SimpleChanges, OnDestroy, Output } from '@angular/core';
import { Map, Expression, IconOptions, TextOptions } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';
import { LayerDirective } from './layer-directive';

@Directive({
  selector: '[symbol-layer], symbol-layer'
})
export class SymbolLayerDirective
  extends LayerDirective<atlas.layer.SymbolLayer>
  implements OnChanges {

  @Input() public filter: Expression;
  @Input() public iconOptions: IconOptions;
  @Input() public lineSpacing: Expression | number;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public placement: "point" | "line" | "line-center";
  @Input() public textOptions: TextOptions;
  @Input() public visible: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (this.layer) {
      this.layer.setOptions({
        filter: this.filter,
        iconOptions: this.iconOptions,
        lineSpacing: this.lineSpacing,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        placement: this.placement,
        textOptions: this.textOptions,
        visible: this.visible
      });
    }
  }

  protected buildLayer(map: Map, dataSource: atlas.source.DataSource): atlas.layer.SymbolLayer {
    return new atlas.layer.SymbolLayer(dataSource, this.id, {
      filter: this.filter,
      iconOptions: this.iconOptions,
      lineSpacing: this.lineSpacing,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      placement: this.placement,
      textOptions: this.textOptions,
      visible: this.visible
    });
  }

}
