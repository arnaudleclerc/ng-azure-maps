import { Input, Directive, OnDestroy, SimpleChanges, OnChanges, Output } from '@angular/core';
import { Pixel } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';
import { Subject } from 'rxjs';
import { IMarkerEvent } from '../../contracts';

@Directive({
  selector: '[map-html-marker], map-html-marker'
})
export class HtmlMarkerDirective
  implements OnChanges, OnDestroy {

  private _map: atlas.Map;
  private _marker: atlas.HtmlMarker;

  private readonly _markerEvents = new Map<any, (e: any) => void>(
    [
      ["click", e => this.onClick.next(this.toMarkerEvent(e))],
      ["contextmenu", e => this.onContextMenu.next(this.toMarkerEvent(e))],
      ["dblclick", e => this.onDbClick.next(this.toMarkerEvent(e))],
      ["drag", e => this.onDrag.next(this.toMarkerEvent(e))],
      ["dragstart", e => this.onDragStart.next(this.toMarkerEvent(e))],
      ["dragend", e => this.onDragEnd.next(this.toMarkerEvent(e))],
      ["keydown", e => this.onKeyDown.next(this.toMarkerEvent(e))],
      ["keypress", e => this.onKeyPress.next(this.toMarkerEvent(e))],
      ["keyup", e => this.onKeyUp.next(this.toMarkerEvent(e))],
      ["mousedown", e => this.onMouseDown.next(this.toMarkerEvent(e))],
      ["mouseenter", e => this.onMouseEnter.next(this.toMarkerEvent(e))],
      ["mouseleave", e => this.onMouseLeave.next(this.toMarkerEvent(e))],
      ["mousemove", e => this.onMouseMove.next(this.toMarkerEvent(e))],
      ["mouseout", e => this.onMouseOut.next(this.toMarkerEvent(e))],
      ["mouseover", e => this.onMouseOver.next(this.toMarkerEvent(e))],
      ["mouseup", e => this.onMouseUp.next(this.toMarkerEvent(e))]
    ]
  );

  @Input() public anchor: string;
  @Input() public color: string;
  @Input() public draggable: boolean;
  @Input() public htmlContent: string | HTMLElement;
  @Input() public pixelOffset: Pixel;
  @Input() public position: atlas.data.Position;
  @Input() public secondaryColor: string;
  @Input() public text: string;
  @Input() public visible: boolean;

  @Output() public onClick = new Subject<IMarkerEvent>();
  @Output() public onContextMenu = new Subject<IMarkerEvent>();
  @Output() public onDbClick = new Subject<IMarkerEvent>();
  @Output() public onDrag = new Subject<IMarkerEvent>();
  @Output() public onDragStart = new Subject<IMarkerEvent>();
  @Output() public onDragEnd = new Subject<IMarkerEvent>();
  @Output() public onKeyDown = new Subject<IMarkerEvent>();
  @Output() public onKeyPress = new Subject<IMarkerEvent>();
  @Output() public onKeyUp = new Subject<IMarkerEvent>();
  @Output() public onMouseDown = new Subject<IMarkerEvent>();
  @Output() public onMouseEnter = new Subject<IMarkerEvent>();
  @Output() public onMouseLeave = new Subject<IMarkerEvent>();
  @Output() public onMouseMove = new Subject<IMarkerEvent>();
  @Output() public onMouseOut = new Subject<IMarkerEvent>();
  @Output() public onMouseOver = new Subject<IMarkerEvent>();
  @Output() public onMouseUp = new Subject<IMarkerEvent>();

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

    this.onClick.unsubscribe();
    this.onContextMenu.unsubscribe();
    this.onDbClick.unsubscribe();
    this.onDrag.unsubscribe();
    this.onDragStart.unsubscribe();
    this.onDragEnd.unsubscribe();
    this.onKeyDown.unsubscribe();
    this.onKeyPress.unsubscribe();
    this.onKeyUp.unsubscribe();
    this.onMouseDown.unsubscribe();
    this.onMouseEnter.unsubscribe();
    this.onMouseLeave.unsubscribe();
    this.onMouseMove.unsubscribe();
    this.onMouseOut.unsubscribe();
    this.onMouseOver.unsubscribe();
    this.onMouseUp.unsubscribe();

  }

  public addToMap(map: atlas.Map) {
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

    this._markerEvents.forEach((value, key) => {
      this._map.events.add(key, this._marker, value);
    });

    map.markers.add(this._marker);
  }

  private toMarkerEvent(e: any): IMarkerEvent {
    return {
      marker: this._marker,
      event: e
    };
  }

}
