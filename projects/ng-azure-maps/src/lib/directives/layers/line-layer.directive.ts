import { SourceLayerDirective } from './source-layer-directive';
import * as atlas from 'azure-maps-control';
import { OnChanges, Input, SimpleChanges, Directive } from '@angular/core';

@Directive({
  selector: '[map-line-layer], map-line-layer'
})
export class LineLayerDirective
  extends SourceLayerDirective<atlas.layer.LineLayer>
  implements OnChanges {

  @Input() public blur: number | atlas.Expression;
  @Input() public filter: atlas.Expression;
  @Input() public lineCap: "butt" | "round" | "square";
  @Input() public lineJoin: "bevel" | "round" | "miter";
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public offset: number | atlas.Expression;
  @Input() public strokeColor: string | atlas.Expression;
  @Input() public strokeDashArray: number[];
  @Input() public strokeGradient: atlas.Expression;
  @Input() public strokeOpacity: number | atlas.Expression;
  @Input() public strokeWidth: number | atlas.Expression;
  @Input() public translate: atlas.Pixel;
  @Input() public translateAnchor: "map" | "viewport";
  @Input() public visible: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (this.layer) {
      this.layer.setOptions({
        blur: this.blur,
        filter: this.filter,
        lineCap: this.lineCap,
        lineJoin: this.lineJoin,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        offset: this.offset,
        source: this.dataSourceId,
        sourceLayer: this.sourceLayer,
        strokeColor: this.strokeColor,
        strokeDashArray: this.strokeDashArray,
        strokeGradient: this.strokeGradient,
        strokeOpacity: this.strokeOpacity,
        strokeWidth: this.strokeWidth,
        translate: this.translate,
        translateAnchor: this.translateAnchor,
        visible: this.visible
      });
    }
  }

  protected buildLayer(dataSource: atlas.source.Source): atlas.layer.LineLayer {
    if (this.strokeGradient && (<any>dataSource).setOptions) {
      (<atlas.source.DataSource>dataSource).setOptions({
        lineMetrics: true
      });
    }

    return new atlas.layer.LineLayer(dataSource, this.id, {
      blur: this.blur,
      filter: this.filter,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      offset: this.offset,
      source: this.dataSourceId,
      sourceLayer: this.sourceLayer,
      strokeColor: this.strokeColor,
      strokeDashArray: this.strokeDashArray,
      strokeGradient: this.strokeGradient,
      strokeOpacity: this.strokeOpacity,
      strokeWidth: this.strokeWidth,
      translate: this.translate,
      translateAnchor: this.translateAnchor,
      visible: this.visible
    });
  }

}
