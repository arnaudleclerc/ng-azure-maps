import { Directive, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as atlas from 'azure-maps-control';
import { LayerDirective } from './layer-directive';

@Directive({
  selector: '[image-layer], image-layer'
})
export class ImageLayerDirective
  extends LayerDirective<atlas.layer.ImageLayer>
  implements OnChanges {

  @Input() public contrast: number;
  @Input() public coordinates: atlas.data.Position[];
  @Input() public fadeDuration: number;
  @Input() public filter: atlas.Expression;
  @Input() public hueRotation: number;
  @Input() public maxBrightness: number;
  @Input() public maxZoom: number;
  @Input() public minBrightness: number;
  @Input() public minZoom: number;
  @Input() public opacity: number;
  @Input() public saturation: number;
  @Input() public url: string;
  @Input() public visible: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.layer) {
      this.layer.setOptions({
        contrast: this.contrast,
        coordinates: this.coordinates,
        fadeDuration: this.fadeDuration,
        filter: this.filter,
        hueRotation: this.hueRotation,
        maxBrightness: this.maxBrightness,
        maxZoom: this.maxZoom,
        minBrightness: this.minBrightness,
        minZoom: this.minZoom,
        opacity: this.opacity,
        saturation: this.saturation,
        url: this.url,
        visible: this.visible
      });
    }
  }

  public initialize(map: atlas.Map): void {
    this.layer = new atlas.layer.ImageLayer({
      contrast: this.contrast,
      coordinates: this.coordinates,
      fadeDuration: this.fadeDuration,
      filter: this.filter,
      hueRotation: this.hueRotation,
      maxBrightness: this.maxBrightness,
      maxZoom: this.maxZoom,
      minBrightness: this.minBrightness,
      minZoom: this.minZoom,
      opacity: this.opacity,
      saturation: this.saturation,
      url: this.url,
      visible: this.visible
    });

    this.initializeEvents(map);

    map.layers.add(this.layer);
  }

}
