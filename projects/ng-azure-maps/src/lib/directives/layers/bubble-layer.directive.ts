import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { LayerDirective } from './layer-directive';
import * as atlas from 'azure-maps-control';
import { Map } from 'azure-maps-control';

@Directive({
  selector: '[bubble-layer], bubble-layer'
})
export class BubbleLayerDirective
  extends LayerDirective<atlas.layer.BubbleLayer>
  implements OnChanges {

  @Input() public blur: number | atlas.Expression;
  @Input() public color: string | atlas.Expression;
  @Input() public filter: atlas.Expression;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public opacity: number | atlas.Expression;
  @Input() public pitchAlignment: "map" | "viewport";
  @Input() public radius: number | atlas.Expression;
  @Input() public strokeColor: string | atlas.Expression;
  @Input() public strokeOpacity: number | atlas.Expression;
  @Input() public strokeWidth: number | atlas.Expression;
  @Input() public visible: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (this.layer) {
      this.layer.setOptions({
        blur: this.blur,
        color: this.color,
        filter: this.filter,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        opacity: this.opacity,
        pitchAlignment: this.pitchAlignment,
        radius: this.radius,
        strokeColor: this.strokeColor,
        strokeOpacity: this.strokeOpacity,
        strokeWidth: this.strokeWidth,
        visible: this.visible
      });
    }
  }

  protected buildLayer(map: Map, dataSource: atlas.source.DataSource): atlas.layer.BubbleLayer {
    return new atlas.layer.BubbleLayer(dataSource, this.id, {
      blur: this.blur,
      color: this.color,
      filter: this.filter,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      opacity: this.opacity,
      pitchAlignment: this.pitchAlignment,
      radius: this.radius,
      strokeColor: this.strokeColor,
      strokeOpacity: this.strokeOpacity,
      strokeWidth: this.strokeWidth,
      visible: this.visible
    });
  }

}
