import { Directive, OnChanges, Input } from '@angular/core';
import { SourceLayerDirective } from './source-layer-directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[heatmap-layer], heatmap-layer'
})
export class HeatmapLayerDirective
  extends SourceLayerDirective<atlas.layer.HeatMapLayer>
  implements OnChanges {

  @Input() public color: atlas.Expression;
  @Input() public filter: atlas.Expression;
  @Input() public intensity: number | atlas.Expression;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public opacity: number | atlas.Expression;
  @Input() public radius: number | atlas.Expression;
  @Input() public visible: boolean;
  @Input() public weight: number | atlas.Expression;

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.layer) {
      this.layer.setOptions({
        color: this.color,
        filter: this.filter,
        intensity: this.intensity,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        opacity: this.opacity,
        radius: this.radius,
        visible: this.visible,
        weight: this.weight
      });
    }
  }
  protected buildLayer(dataSource: atlas.source.DataSource): atlas.layer.HeatMapLayer {
    return new atlas.layer.HeatMapLayer(dataSource, this.id, {
      color: this.color,
      filter: this.filter,
      intensity: this.intensity,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      opacity: this.opacity,
      radius: this.radius,
      visible: this.visible,
      weight: this.weight
    });
  }

}