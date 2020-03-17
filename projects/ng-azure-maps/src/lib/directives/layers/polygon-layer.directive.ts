import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { SourceLayerDirective } from './source-layer-directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[polygon-layer], polygon-layer'
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

  ngOnChanges(changes: SimpleChanges) {
    if (this.layer) {
      this.layer.setOptions({
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
        fillPattern: this.fillPattern,
        filter: this.filter,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        visible: this.visible
      });
    }
  }

  protected buildLayer(dataSource: atlas.source.DataSource): atlas.layer.PolygonLayer {
    return new atlas.layer.PolygonLayer(dataSource, this.id, {
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity,
      fillPattern: this.fillPattern,
      filter: this.filter,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      visible: this.visible
    });
  }

}
