import { Input, Directive, OnDestroy, SimpleChanges, OnChanges, Output } from '@angular/core';
import * as atlas from 'azure-maps-control';
import { IPopupEvent } from '../../contracts/popup-event';
import { Subject } from 'rxjs';

@Directive({
  selector: '[popup], popup'
})
export class PopupDirective
  implements OnChanges, OnDestroy {

  private _map: atlas.Map;
  private _popup: atlas.Popup;
  
  private readonly _popupEvents = new Map<any, (e: any) => void>(
    [
      ["close", e => this.onClose.next(this.toPopupEvent(e))],
      ["drag", e => this.onDrag.next(this.toPopupEvent(e))],
      ["dragend", e => this.onDragEnd.next(this.toPopupEvent(e))],
      ["dragstart", e => this.onDragStart.next(this.toPopupEvent(e))],
      ["open", e => this.onOpen.next(this.toPopupEvent(e))],
    ]
  );

  @Input() public opened: boolean;

  @Input() public closeButton: boolean;
  @Input() public content: HTMLElement | string;
  @Input() public draggable: boolean;
  @Input() public fillColor: string;
  @Input() public pixelOffset: atlas.Pixel;
  @Input() public position: atlas.data.Position;
  @Input() public showPointer: boolean;

  @Output() public onClose = new Subject<IPopupEvent>();
  @Output() public onDrag = new Subject<IPopupEvent>();
  @Output() public onDragEnd = new Subject<IPopupEvent>();
  @Output() public onDragStart = new Subject<IPopupEvent>();
  @Output() public onOpen = new Subject<IPopupEvent>();

  public get hasMap(): boolean {
    return !!this._map;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._popup) {
      this._popup.setOptions({
        closeButton: this.closeButton,
        content: this.content,
        draggable: this.draggable,
        fillColor: this.fillColor,
        pixelOffset: this.pixelOffset,
        position: this.position,
        showPointer: this.showPointer
      });

      if(changes.opened) {
        if(changes.opened.currentValue && !this._popup.isOpen()) {
          this._popup.open(this._map);
        }
        if(!changes.opened.currentValue && this._popup.isOpen()) {
          this._popup.close();
        }
      }
    }
  }

  ngOnDestroy() {
    if (this._map) {
      this._map.popups.remove(this._popup);
    }

    this.onClose.unsubscribe();
    this.onDrag.unsubscribe();
    this.onDragEnd.unsubscribe();
    this.onDragStart.unsubscribe();
    this.onOpen.unsubscribe();
  }

  public addToMap(map: atlas.Map) {
    this._map = map;
    this._popup = new atlas.Popup({
      closeButton: this.closeButton,
      content: this.content,
      draggable: this.draggable,
      fillColor: this.fillColor,
      pixelOffset: this.pixelOffset,
      position: this.position,
      showPointer: this.showPointer
    });

    this._popupEvents.forEach((value, key) => {
      this._map.events.add(key, this._popup, value);
    });

    map.popups.add(this._popup);
  }

  private toPopupEvent(e: any): IPopupEvent {
    return {
      popup: this._popup,
      event: e
    };
  }
}
