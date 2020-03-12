import { Input, Directive, OnDestroy, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { Map, Pixel } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';

@Directive({
  selector: '[html-marker], html-marker'
})
export class HtmlMarkerDirective
  implements OnChanges, OnDestroy {

  private _map: Map;
  private _marker: atlas.HtmlMarker;

  @Input() public anchor: string;
  @Input() public color: string;
  @Input() public draggable: boolean;
  @Input() public htmlContent: string | HTMLElement;
  @Input() public pixelOffset: Pixel;
  @Input() public position: atlas.data.Position;
  @Input() public secondaryColor: string;
  @Input() public text: string;
  @Input() public visible: boolean;

  public get hasMap(): boolean {
    return !!this._map;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._marker) {
      this._marker.setOptions({
        anchor: this.anchor,
        color: this.color,
        draggable: this.draggable,
        htmlContent: this.htmlContent,
        pixelOffset: this.pixelOffset,
        position: this.position,
        secondaryColor: this.secondaryColor,
        text: this.text,
        visible: this.visible
      });
    }
  }

  ngOnDestroy() {
    if (this._map) {
      this._map.markers.remove(this._marker);
    }
  }

  public addToMap(map: Map) {
    this._map = map;
    this._marker = new atlas.HtmlMarker({
      anchor: this.anchor,
      color: this.color,
      draggable: this.draggable,
      htmlContent: this.htmlContent,
      pixelOffset: this.pixelOffset,
      position: this.position,
      secondaryColor: this.secondaryColor,
      text: this.text,
      visible: this.visible
    });

    map.markers.add(this._marker);
  }

}
