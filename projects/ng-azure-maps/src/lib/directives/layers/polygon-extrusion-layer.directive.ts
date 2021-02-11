import { Directive, OnChanges, Input } from '@angular/core';
import * as atlas from 'azure-maps-control';
import { SourceLayerDirective } from './source-layer-directive';

@Directive({
  selector: '[map-polygon-extrusion-layer], map-polygon-extrusion-layer'
})
export class PolygonExtrusionLayerDirective
  extends SourceLayerDirective<atlas.layer.PolygonExtrusionLayer>
  implements OnChanges {

  @Input() public base: number | atlas.Expression;
  @Input() public fillColor: string | atlas.Expression;
  @Input() public fillOpacity: number;
  @Input() public fillPattern: string;
  @Input() public filter: atlas.Expression;
  @Input() public height: number;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public translate: atlas.Pixel;
  @Input() public translateAnchor: 'map' | 'viewport';
  @Input() public verticalGradient: boolean;
  @Input() public visible: boolean;

  ngOnChanges() {
    if (this.layer) {
      this.layer.setOptions({
        base: this.base,
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
        fillPattern: this.fillPattern,
        filter: this.filter,
        height: this.height,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        source: this.dataSourceId,
        sourceLayer: this.sourceLayer,
        translate: this.translate,
        translateAnchor: this.translateAnchor,
        verticalGradient: this.verticalGradient,
        visible: this.visible
      });
    }
  }

  protected buildLayer(dataSource: atlas.source.Source): atlas.layer.PolygonExtrusionLayer {
    return new atlas.layer.PolygonExtrusionLayer(dataSource, this.id, {
      base: this.base,
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity,
      fillPattern: this.fillPattern,
      filter: this.filter,
      height: this.height,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      source: this.dataSourceId,
      sourceLayer: this.sourceLayer,
      translate: this.translate,
      translateAnchor: this.translateAnchor,
      verticalGradient: this.verticalGradient,
      visible: this.visible
    });
  }

}
