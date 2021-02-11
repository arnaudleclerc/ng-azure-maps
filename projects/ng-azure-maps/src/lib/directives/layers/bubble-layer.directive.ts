import { Directive, OnChanges, Input } from '@angular/core';
import { SourceLayerDirective } from './source-layer-directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[map-bubble-layer], map-bubble-layer'
})
export class BubbleLayerDirective
  extends SourceLayerDirective<atlas.layer.BubbleLayer>
  implements OnChanges {

  @Input() public blur: number | atlas.Expression;
  @Input() public color: string | atlas.Expression;
  @Input() public filter: atlas.Expression;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public opacity: number | atlas.Expression;
  @Input() public pitchAlignment: 'map' | 'viewport';
  @Input() public radius: number | atlas.Expression;
  @Input() public strokeColor: string | atlas.Expression;
  @Input() public strokeOpacity: number | atlas.Expression;
  @Input() public strokeWidth: number | atlas.Expression;
  @Input() public visible: boolean;

  ngOnChanges() {
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
        source: this.dataSourceId,
        sourceLayer: this.sourceLayer,
        strokeColor: this.strokeColor,
        strokeOpacity: this.strokeOpacity,
        strokeWidth: this.strokeWidth,
        visible: this.visible
      });
    }
  }

  protected buildLayer(dataSource: atlas.source.Source): atlas.layer.BubbleLayer {
    return new atlas.layer.BubbleLayer(dataSource, this.id, {
      blur: this.blur,
      color: this.color,
      filter: this.filter,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      opacity: this.opacity,
      pitchAlignment: this.pitchAlignment,
      radius: this.radius,
      source: this.dataSourceId,
      sourceLayer: this.sourceLayer,
      strokeColor: this.strokeColor,
      strokeOpacity: this.strokeOpacity,
      strokeWidth: this.strokeWidth,
      visible: this.visible
    });
  }

}
