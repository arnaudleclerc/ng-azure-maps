import { Directive, Input, OnChanges } from '@angular/core';
import * as atlas from 'azure-maps-control';
import { SourceLayerDirective } from './source-layer-directive';

@Directive({
    selector: '[map-symbol-layer], map-symbol-layer',
    standalone: false
})
export class SymbolLayerDirective
  extends SourceLayerDirective<atlas.layer.SymbolLayer>
  implements OnChanges {

  @Input() public filter: atlas.Expression;
  @Input() public iconOptions: atlas.IconOptions;
  @Input() public lineSpacing: atlas.Expression | number;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public placement: 'point' | 'line' | 'line-center';
  @Input() public textOptions: atlas.TextOptions;
  @Input() public visible: boolean;

  ngOnChanges() {
    if (this.layer) {
      this.layer.setOptions({
        filter: this.filter,
        iconOptions: this.iconOptions,
        lineSpacing: this.lineSpacing,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        source: this.dataSourceId,
        sourceLayer: this.sourceLayer,
        placement: this.placement,
        textOptions: this.textOptions,
        visible: this.visible
      });
    }
  }

  protected buildLayer(dataSource: atlas.source.Source): atlas.layer.SymbolLayer {
    return new atlas.layer.SymbolLayer(dataSource, this.id, {
      filter: this.filter,
      iconOptions: this.iconOptions,
      lineSpacing: this.lineSpacing,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      source: this.dataSourceId,
      sourceLayer: this.sourceLayer,
      placement: this.placement,
      textOptions: this.textOptions,
      visible: this.visible
    });
  }

}
