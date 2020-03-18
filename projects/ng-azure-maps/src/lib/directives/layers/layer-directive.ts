import * as atlas from 'azure-maps-control';
import { OnDestroy, Input, Output, AfterViewInit } from '@angular/core';
import { ILayerEvent } from '../../contracts';
import { Subject } from 'rxjs';

export abstract class LayerDirective<T extends atlas.layer.Layer>
  implements OnDestroy {
  
    private readonly _layerEvents = new Map<any, (e: any) => void>(
    [
      ["layeradded", e => this.onAdded.next(this.toLayerEvent(this.layer, e))],
      ["layerremoved", e => this.onRemoved.next(this.toLayerEvent(this.layer, e))],
      ["mousedown", e => this.onMouseDown.next(this.toLayerEvent(this.layer, e))],
      ["mouseup", e => this.onMouseUp.next(this.toLayerEvent(this.layer, e))],
      ["mouseover", e => this.onMouseOver.next(this.toLayerEvent(this.layer, e))],
      ["mousemove", e => this.onMouseMove.next(this.toLayerEvent(this.layer, e))],
      ["click", e => this.onClick.next(this.toLayerEvent(this.layer, e))],
      ["dbclick", e => this.onDbClick.next(this.toLayerEvent(this.layer, e))],
      ["mouseout", e => this.onMouseOut.next(this.toLayerEvent(this.layer, e))],
      ["mouseenter", e => this.onMouseEnter.next(this.toLayerEvent(this.layer, e))],
      ["mouseleave", e => this.onMouseLeave.next(this.toLayerEvent(this.layer, e))],
      ["contextmenu", e => this.onContextMenu.next(this.toLayerEvent(this.layer, e))],
      ["touchstart", e => this.onTouchStart.next(this.toLayerEvent(this.layer, e))],
      ["touchend", e => this.onTouchEnd.next(this.toLayerEvent(this.layer, e))],
      ["touchmove", e => this.onTouchMove.next(this.toLayerEvent(this.layer, e))],
      ["touchcancel", e => this.onTouchCancel.next(this.toLayerEvent(this.layer, e))],
      ["wheel", e => this.onWheel.next(this.toLayerEvent(this.layer, e))],
    ]
  );

  protected layer: T;

  @Input() public id: string;
    
  @Output() public onAdded = new Subject<ILayerEvent>();
  @Output() public onRemoved = new Subject<ILayerEvent>();
  @Output() public onMouseDown = new Subject<ILayerEvent>();
  @Output() public onMouseUp = new Subject<ILayerEvent>();
  @Output() public onMouseOver = new Subject<ILayerEvent>();
  @Output() public onMouseMove = new Subject<ILayerEvent>();
  @Output() public onClick = new Subject<ILayerEvent>();
  @Output() public onDbClick = new Subject<ILayerEvent>();
  @Output() public onMouseOut = new Subject<ILayerEvent>();
  @Output() public onMouseEnter = new Subject<ILayerEvent>();
  @Output() public onMouseLeave = new Subject<ILayerEvent>();
  @Output() public onContextMenu = new Subject<ILayerEvent>();
  @Output() public onTouchStart = new Subject<ILayerEvent>();
  @Output() public onTouchEnd = new Subject<ILayerEvent>();
  @Output() public onTouchMove = new Subject<ILayerEvent>();
  @Output() public onTouchCancel = new Subject<ILayerEvent>();
  @Output() public onWheel = new Subject<ILayerEvent>();

  public get hasLayer(): boolean {
    return !!this.layer;
  }

  protected initializeEvents(map: atlas.Map): void {
    this._layerEvents.forEach((value, key) => {
      map.events.add(key, this.layer, value);
    });
  }

  ngOnDestroy(): void {
    this.layer.getMap().layers.remove(this.layer);
    
    this.onAdded.unsubscribe();
    this.onRemoved.unsubscribe();
    this.onMouseDown.unsubscribe();
    this.onMouseUp.unsubscribe();
    this.onMouseOver.unsubscribe();
    this.onMouseMove.unsubscribe();
    this.onClick.unsubscribe();
    this.onDbClick.unsubscribe();
    this.onMouseOut.unsubscribe();
    this.onMouseEnter.unsubscribe();
    this.onMouseLeave.unsubscribe();
    this.onContextMenu.unsubscribe();
    this.onTouchStart.unsubscribe();
    this.onTouchEnd.unsubscribe();
    this.onTouchMove.unsubscribe();
    this.onTouchCancel.unsubscribe();
    this.onWheel.unsubscribe();
  }

  private toLayerEvent(layer: atlas.layer.Layer | atlas.layer.Layer[], e: any): ILayerEvent {
    return {
      layer: layer,
      event: e
    };
  }
}
