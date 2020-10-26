import { Directive, OnChanges, SimpleChanges, Input } from '@angular/core';
import { LayerDirective } from './layer-directive';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[map-tile-layer], map-tile-layer'
})
export class TileLayerDirective
  extends LayerDirective<atlas.layer.TileLayer>
  implements OnChanges {

  @Input() public bounds: atlas.data.BoundingBox;
  @Input() public contrast: number;
  @Input() public fadeDuration: number;
  @Input() public filter: atlas.Expression;
  @Input() public hueRotation: number;
  @Input() public isTMS: boolean;
  @Input() public maxBrightness: number;
  @Input() public maxSourceZoom: number;
  @Input() public maxZoom: number;
  @Input() public minBrightness: number;
  @Input() public minSourceZoom: number;
  @Input() public minZoom: number;
  @Input() public opacity: number;
  @Input() public saturation: number;
  @Input() public subdomains: string[];
  @Input() public tileSize: number;
  @Input() public tileUrl: string;
  @Input() public visible: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.layer) {
      this.layer.setOptions({
        bounds: this.bounds,
        contrast: this.contrast,
        fadeDuration: this.fadeDuration,
        filter: this.filter,
        hueRotation: this.hueRotation,
        isTMS: this.isTMS,
        maxBrightness: this.maxBrightness,
        maxSourceZoom: this.maxSourceZoom,
        maxZoom: this.maxZoom,
        minBrightness: this.minBrightness,
        minSourceZoom: this.minSourceZoom,
        minZoom: this.minZoom,
        opacity: this.opacity,
        saturation: this.saturation,
        subdomains: this.subdomains,
        tileSize: this.tileSize,
        tileUrl: this.tileUrl,
        visible: this.visible
      });
    }
  }

  public initialize(map: atlas.Map): void {
    this.layer = new atlas.layer.TileLayer({
      bounds: this.bounds,
      contrast: this.contrast,
      fadeDuration: this.fadeDuration,
      filter: this.filter,
      hueRotation: this.hueRotation,
      isTMS: this.isTMS,
      maxBrightness: this.maxBrightness,
      maxSourceZoom: this.maxSourceZoom,
      maxZoom: this.maxZoom,
      minBrightness: this.minBrightness,
      minSourceZoom: this.minSourceZoom,
      minZoom: this.minZoom,
      opacity: this.opacity,
      saturation: this.saturation,
      subdomains: this.subdomains,
      tileSize: this.tileSize,
      tileUrl: this.tileUrl,
      visible: this.visible
    }, this.id);

    this.initializeEvents(map);

    map.layers.add(this.layer, this.before);
  }

}
