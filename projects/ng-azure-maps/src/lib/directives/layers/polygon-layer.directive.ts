import { Directive, OnChanges, Input } from '@angular/core';
import { SourceLayerDirective } from './source-layer-directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[map-polygon-layer], map-polygon-layer'
})
export class PolygonLayerDirective
  extends SourceLayerDirective<atlas.layer.PolygonLayer>
  implements OnChanges {

  @Input() public fillColor: string | atlas.Expression;
  @Input() public fillOpacity: number | atlas.Expression;
  @Input() public fillPattern: string | atlas.Expression;
  @Input() public filter: atlas.Expression;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public visible: boolean;

  ngOnChanges() {
    if (this.layer) {
      this.layer.setOptions({
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
        fillPattern: this.fillPattern,
        filter: this.filter,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        source: this.dataSourceId,
        sourceLayer: this.sourceLayer,
        visible: this.visible
      });
    }
  }

  protected buildLayer(dataSource: atlas.source.Source): atlas.layer.PolygonLayer {
    return new atlas.layer.PolygonLayer(dataSource, this.id, {
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity,
      fillPattern: this.fillPattern,
      filter: this.filter,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      source: this.dataSourceId,
      sourceLayer: this.sourceLayer,
      visible: this.visible
    });
  }

}
