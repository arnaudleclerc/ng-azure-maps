import { Directive, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import * as atlas from 'azure-maps-control';
import * as atlasdrawing from 'azure-maps-drawing-tools';
import { Subject } from 'rxjs';

@Directive({
  selector: '[map-drawing-toolbar], map-drawing-toolbar'
})
export class DrawingToolbarDirective
  implements OnChanges, OnDestroy {

  private _drawingManager: atlasdrawing.drawing.DrawingManager;
  private _toolbar: atlasdrawing.control.DrawingToolbar;
  private _map: atlas.Map;

  @Input() public dragHandleStyle: atlas.HtmlMarkerOptions;
  @Input() public freehandInterval: number;
  @Input() public interactionType: atlasdrawing.drawing.DrawingInteractionType;
  @Input() public mode: atlasdrawing.drawing.DrawingMode;
  @Input() public secondaryDragHandleStyle: atlas.HtmlMarkerOptions;
  @Input() public shapeDraggingEnabled: boolean;

  @Input() public buttons: string[];
  @Input() public containerId: string;
  @Input() public numColumns: number;
  @Input() public position: string;
  @Input() public toolbarStyle: string;
  @Input() public visible: boolean;

  @Output() public drawingChanged = new Subject<atlas.Shape>();
  @Output() public drawingChanging = new Subject<atlas.Shape>();
  @Output() public drawingComplete = new Subject<atlas.Shape>();
  @Output() public drawingModeChanged = new Subject<atlasdrawing.drawing.DrawingMode>();
  @Output() public drawingStarted = new Subject<atlas.Shape>();

  ngOnChanges(): void {
    if (this._toolbar) {
      this._toolbar.setOptions({
        buttons: this.buttons,
        containerId: this.containerId,
        numColumns: this.numColumns,
        position: this.position,
        style: this.toolbarStyle,
        visible: this.visible
      });
    }
  }

  ngOnDestroy() {
    if (this._map) {
      this._map.events.remove('drawingchanged', this._drawingManager, null);
      this._map.events.remove('drawingchanging', this._drawingManager, null);
      this._map.events.remove('drawingcomplete', this._drawingManager, null);
      this._map.events.remove('drawingmodechanged', this._drawingManager, null);
      this._map.events.remove('drawingstarted', this._drawingManager, null);
      this._map.controls.remove(this._toolbar);
    }
  }

  public initialize(map: atlas.Map): void {
    this._map = map;
    this._toolbar = new atlasdrawing.control.DrawingToolbar({
      buttons: this.buttons,
      containerId: this.containerId,
      numColumns: this.numColumns,
      position: this.position,
      style: this.toolbarStyle,
      visible: this.visible
    });
    this._drawingManager = new atlasdrawing.drawing.DrawingManager(map, {
      dragHandleStyle: this.dragHandleStyle,
      freehandInterval: this.freehandInterval,
      interactionType: this.interactionType,
      mode: this.mode,
      secondaryDragHandleStyle: this.secondaryDragHandleStyle,
      shapeDraggingEnabled: this.shapeDraggingEnabled,
      toolbar: this._toolbar
    });

    this._map.events.add('drawingchanged', this._drawingManager, e => {
      this.drawingChanged.next(e);
    });

    this._map.events.add('drawingchanging', this._drawingManager, e => {
      this.drawingChanging.next(e);
    });

    this._map.events.add('drawingcomplete', this._drawingManager, e => {
      this.drawingComplete.next(e);
    });

    this._map.events.add('drawingmodechanged', this._drawingManager, e => {
      this.drawingModeChanged.next(e);
    });

    this._map.events.add('drawingstarted', this._drawingManager, e => {
      this.drawingStarted.next(e);
    });
  }

  public getDatasource(): atlas.source.DataSource {
    return this._drawingManager.getSource();
  }

  public getPreviewSource(): atlas.source.DataSource {
    return (this._drawingManager as any).drawingHelper.previewSource;
  }

}
