import {
  Directive,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  ContentChild,
  QueryList,
  AfterContentChecked,
  ContentChildren,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import * as atlas from 'azure-maps-control';
import { ZoomControlDirective } from '../controls/zoom-control.directive';
import { PitchControlDirective } from '../controls/pitch-control.directive';
import { CompassControlDirective } from '../controls/compass-control.directive';
import { StyleControlDirective } from '../controls/style-control.directive';
import { HtmlMarkerDirective } from '../markers/html-marker.directive';
import { DrawingToolbarDirective } from '../drawing/drawing-toolbar.directive';
import { SymbolLayerDirective } from '../layers/symbol-layer.directive';
import { BubbleLayerDirective } from '../layers/bubble-layer.directive';
import { SourceLayerDirective } from '../layers/source-layer-directive';
import { LineLayerDirective } from '../layers/line-layer.directive';
import { PolygonLayerDirective } from '../layers/polygon-layer.directive';
import { PolygonExtrusionLayerDirective } from '../layers/polygon-extrusion-layer.directive';
import { HeatmapLayerDirective } from '../layers/heatmap-layer.directive';
import { ImageLayerDirective } from '../layers/image-layer.directive';
import { TileLayerDirective } from '../layers/tile-layer.directive';
import { IMapEvent } from '../../contracts';
import { PopupDirective } from '../popups/popup.directive';

@Directive({
    selector: '[azure-map], azure-map',
    queries: {
        zoomControl: new ContentChild(ZoomControlDirective),
        pitchControl: new ContentChild(PitchControlDirective),
        compassControl: new ContentChild(CompassControlDirective),
        styleControl: new ContentChild(StyleControlDirective),
        htmlMarkers: new ContentChildren(HtmlMarkerDirective),
        drawingToolbar: new ContentChild(DrawingToolbarDirective),
        symbolLayers: new ContentChildren(SymbolLayerDirective),
        bubbleLayers: new ContentChildren(BubbleLayerDirective),
        lineLayers: new ContentChildren(LineLayerDirective),
        polygonLayers: new ContentChildren(PolygonLayerDirective),
        polygonExtrusionLayers: new ContentChildren(PolygonExtrusionLayerDirective),
        heatmapLayers: new ContentChildren(HeatmapLayerDirective),
        imageLayers: new ContentChildren(ImageLayerDirective),
        tileLayers: new ContentChildren(TileLayerDirective),
        popups: new ContentChildren(PopupDirective)
    },
    standalone: false
})
export class AzureMapDirective
  implements AfterViewInit, AfterContentChecked, OnChanges {

  private readonly _mapEvents = new Map<any, (e: any) => void>(
    [
      ['boxzoomend', e => this.onBoxZoomEnd.next(this.toMapEvent(e))],
      ['boxzoomstart', e => this.onBoxZoomStart.next(this.toMapEvent(e))],
      ['click', e => this.onClick.next(this.toMapEvent(e))],
      ['contextmenu', e => this.onContextMenu.next(this.toMapEvent(e))],
      ['data', e => this.onData.next(this.toMapEvent(e))],
      ['dblclick', e => this.onDblClick.next(this.toMapEvent(e))],
      ['drag', e => this.onDrag.next(this.toMapEvent(e))],
      ['dragend', e => this.onDragEnd.next(this.toMapEvent(e))],
      ['dragstart', e => this.onDragStart.next(this.toMapEvent(e))],
      ['idle', e => this.onIdle.next(this.toMapEvent(e))],
      ['layeradded', e => this.onLayerAdded.next(this.toMapEvent(e))],
      ['layerremoved', e => this.onLayerRemoved.next(this.toMapEvent(e))],
      ['mousedown', e => this.onMouseDown.next(this.toMapEvent(e))],
      ['mouseleave', e => this.onMouseLeave.next(this.toMapEvent(e))],
      ['mousemove', e => this.onMouseMove.next(this.toMapEvent(e))],
      ['mouseout', e => this.onMouseOut.next(this.toMapEvent(e))],
      ['mouseover', e => this.onMouseOver.next(this.toMapEvent(e))],
      ['mouseup', e => this.onMouseUp.next(this.toMapEvent(e))],
      ['move', e => this.onMove.next(this.toMapEvent(e))],
      ['moveend', e => this.onMoveEnd.next(this.toMapEvent(e))],
      ['movestart', e => this.onMoveStart.next(this.toMapEvent(e))],
      ['pitch', e => this.onPitch.next(this.toMapEvent(e))],
      ['pitchend', e => this.onPitchEnd.next(this.toMapEvent(e))],
      ['pitchstart', e => this.onPitchStart.next(this.toMapEvent(e))],
      ['render', e => this.onRender.next(this.toMapEvent(e))],
      ['resize', e => this.onResize.next(this.toMapEvent(e))],
      ['rotate', e => this.onRotate.next(this.toMapEvent(e))],
      ['rotateend', e => this.onRotateEnd.next(this.toMapEvent(e))],
      ['rotatestart', e => this.onRotateStart.next(this.toMapEvent(e))],
      ['sourceadded', e => this.onSourceAdded.next(this.toMapEvent(e))],
      ['sourcedata', e => this.onSourceData.next(this.toMapEvent(e))],
      ['sourceremoved', e => this.onSourceRemoved.next(this.toMapEvent(e))],
      ['styledata', e => this.onStyleData.next(this.toMapEvent(e))],
      ['styleimagemissing', e => this.onStyleImageMissing.next(this.toMapEvent(e))],
      ['tokenacquired', e => this.onTokenAcquired.next(this.toMapEvent(e))],
      ['touchcancel', e => this.onTouchCancel.next(this.toMapEvent(e))],
      ['touchend', e => this.onTouchEnd.next(this.toMapEvent(e))],
      ['touchmove', e => this.onTouchMove.next(this.toMapEvent(e))],
      ['touchstart', e => this.onTouchStart.next(this.toMapEvent(e))],
      ['wheel', e => this.onWheel.next(this.toMapEvent(e))],
      ['zoom', e => this.onZoom.next(this.toMapEvent(e))],
      ['zoomend', e => this.onZoomEnd.next(this.toMapEvent(e))],
      ['zoomstart', e => this.onZoomStart.next(this.toMapEvent(e))]
    ]
  );

  private _map: atlas.Map;

  @Input() public autoResize: boolean;
  @Input() public bearing: number;
  @Input() public bounds: [number, number, number, number];
  @Input() public boxZoomInteraction: boolean;
  @Input() public cameraType: 'jump' | 'ease' | 'fly';
  @Input() public center: [number, number];
  @Input() public centerOffset: [number, number];
  @Input() public cursor: string;
  @Input() public dblclickZoomInteraction: boolean;
  @Input() public disableTelemetry: boolean;
  @Input() public duration: number;
  @Input() public dragPanInteraction: boolean;
  @Input() public dragRotateInteraction: boolean;
  @Input() public enableAccessibility: boolean;
  @Input() public interactive: boolean;
  @Input() public keyboardInteraction: boolean;
  @Input() public language: string;
  @Input() public light: atlas.LightOptions;
  @Input() public maxBounds: atlas.data.BoundingBox;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public offset: [number, number];
  @Input() public padding: { top: 0; bottom: 0; left: 0; right: 0 };
  @Input() public preserveDrawingBuffer: boolean;
  @Input() public pitch: number;
  @Input() public refreshExpiredTiles: boolean;
  @Input() public renderWorldCopies: boolean;
  @Input() public scrollZoomInteraction: boolean;
  @Input() public mapStyle: string;
  @Input() public showBuildingModels: boolean;
  @Input() public showFeedbackLink: boolean;
  @Input() public showLogo: boolean;
  @Input() public showTilesBoundary: boolean;
  @Input() public touchInteraction: boolean;
  @Input() public view: string;
  @Input() public wheelZoomRate: number;
  @Input() public zoom: number;

  @Input() public dataSources: atlas.source.Source[];

  @Input() public trafficOptions: atlas.TrafficOptions;

  @Output() public onBoxZoomEnd = new Subject<IMapEvent>();
  @Output() public onBoxZoomStart = new Subject<IMapEvent>();
  @Output() public onClick = new Subject<IMapEvent>();
  @Output() public onContextMenu = new Subject<IMapEvent>();
  @Output() public onData = new Subject<IMapEvent>();
  @Output() public onDblClick = new Subject<IMapEvent>();
  @Output() public onDrag = new Subject<IMapEvent>();
  @Output() public onDragEnd = new Subject<IMapEvent>();
  @Output() public onDragStart = new Subject<IMapEvent>();
  @Output() public onError = new Subject<IMapEvent>();
  @Output() public onIdle = new Subject<IMapEvent>();
  @Output() public onLayerAdded = new Subject<IMapEvent>();
  @Output() public onLayerRemoved = new Subject<IMapEvent>();
  @Output() public onLoad = new Subject<IMapEvent>();
  @Output() public onMouseDown = new Subject<IMapEvent>();
  @Output() public onMouseLeave = new Subject<IMapEvent>();
  @Output() public onMouseMove = new Subject<IMapEvent>();
  @Output() public onMouseOut = new Subject<IMapEvent>();
  @Output() public onMouseOver = new Subject<IMapEvent>();
  @Output() public onMouseUp = new Subject<IMapEvent>();
  @Output() public onMove = new Subject<IMapEvent>();
  @Output() public onMoveEnd = new Subject<IMapEvent>();
  @Output() public onMoveStart = new Subject<IMapEvent>();
  @Output() public onPitch = new Subject<IMapEvent>();
  @Output() public onPitchEnd = new Subject<IMapEvent>();
  @Output() public onPitchStart = new Subject<IMapEvent>();
  @Output() public onReady = new Subject<IMapEvent>();
  @Output() public onRender = new Subject<IMapEvent>();
  @Output() public onResize = new Subject<IMapEvent>();
  @Output() public onRotate = new Subject<IMapEvent>();
  @Output() public onRotateEnd = new Subject<IMapEvent>();
  @Output() public onRotateStart = new Subject<IMapEvent>();
  @Output() public onSourceAdded = new Subject<IMapEvent>();
  @Output() public onSourceData = new Subject<IMapEvent>();
  @Output() public onSourceRemoved = new Subject<IMapEvent>();
  @Output() public onStyleData = new Subject<IMapEvent>();
  @Output() public onStyleImageMissing = new Subject<IMapEvent>();
  @Output() public onTokenAcquired = new Subject<IMapEvent>();
  @Output() public onTouchCancel = new Subject<IMapEvent>();
  @Output() public onTouchEnd = new Subject<IMapEvent>();
  @Output() public onTouchMove = new Subject<IMapEvent>();
  @Output() public onTouchStart = new Subject<IMapEvent>();
  @Output() public onWheel = new Subject<IMapEvent>();
  @Output() public onZoom = new Subject<IMapEvent>();
  @Output() public onZoomEnd = new Subject<IMapEvent>();
  @Output() public onZoomStart = new Subject<IMapEvent>();

  public zoomControl: ZoomControlDirective;
  public pitchControl: PitchControlDirective;
  public compassControl: CompassControlDirective;
  public styleControl: StyleControlDirective;

  public htmlMarkers: QueryList<HtmlMarkerDirective>;

  public drawingToolbar: DrawingToolbarDirective;

  public symbolLayers: QueryList<SymbolLayerDirective>;
  public bubbleLayers: QueryList<BubbleLayerDirective>;
  public lineLayers: QueryList<LineLayerDirective>;
  public polygonLayers: QueryList<PolygonLayerDirective>;
  public polygonExtrusionLayers: QueryList<PolygonExtrusionLayerDirective>;
  public heatmapLayers: QueryList<HeatmapLayerDirective>;
  public imageLayers: QueryList<ImageLayerDirective>;
  public tileLayers: QueryList<TileLayerDirective>;

  public popups: QueryList<PopupDirective>;

  private get sourceLayers(): SourceLayerDirective<atlas.layer.Layer>[] {
    const result = [];
    if (this.symbolLayers.length > 0) {
      result.push(...this.symbolLayers.toArray());
    }

    if (this.bubbleLayers.length > 0) {
      result.push(...this.bubbleLayers.toArray());
    }

    if (this.lineLayers.length > 0) {
      result.push(...this.lineLayers.toArray());
    }

    if (this.polygonLayers.length > 0) {
      result.push(...this.polygonLayers.toArray());
    }

    if (this.polygonExtrusionLayers.length > 0) {
      result.push(...this.polygonExtrusionLayers.toArray());
    }

    if (this.heatmapLayers.length > 0) {
      result.push(...this.heatmapLayers.toArray());
    }

    return result;
  }

  ngAfterViewInit(): void {
    const map = new atlas.Map(this.elementRef.nativeElement, {
      disableTelemetry: this.disableTelemetry,
      enableAccessibility: this.enableAccessibility,
      refreshExpiredTiles: this.refreshExpiredTiles
    } as atlas.ServiceOptions);

    map.events.add('error', e => {
      this.onError.next({
        event: e,
        map
      });
    });

    map.events.addOnce('ready', e => {
      this._map = map;

      this.setOptions();

      this.onReady.next(this.toMapEvent(e));

      this._mapEvents.forEach((value, key) => {
        this._map.events.add(key, value);
      });

      if (this.zoomControl) {
        this.zoomControl.initialize(this._map);
      }

      if (this.pitchControl) {
        this.pitchControl.initialize(this._map);
      }

      if (this.compassControl) {
        this.compassControl.initialize(this._map);
      }

      if (this.styleControl) {
        this.styleControl.initialize(this._map);
      }

      if (this.drawingToolbar) {
        this.drawingToolbar.initialize(this._map);
      }

      this.updateDataSources();
    });

    map.events.addOnce('load', e => {
      if (this.cursor) {
        this._map.getCanvasContainer().style.cursor = this.cursor;
      }
      this.onLoad.next(this.toMapEvent(e));
    });

  }

  ngAfterContentChecked() {
    if (this._map) {
      if (this.htmlMarkers) {
        for (const marker of this.htmlMarkers.filter(m => !m.hasMap)) {
          marker.addToMap(this._map);
        }
      }

      if (this.sourceLayers.length > 0 && this.dataSources) {
        for (const layer of this.sourceLayers.filter(l => !l.hasLayer)) {
          const dataSource = this.dataSources.find(d => d && d.getId() === layer.dataSourceId);
          if (dataSource) {
            layer.initialize(this._map, dataSource);
          }
        }
      }

      if (this.imageLayers.length > 0) {
        for (const layer of this.imageLayers.filter(l => !l.hasLayer)) {
          layer.initialize(this._map);
        }
      }

      if (this.tileLayers.length > 0) {
        for (const layer of this.tileLayers.filter(l => !l.hasLayer)) {
          layer.initialize(this._map);
        }
      }

      if (this.popups) {
        for (const popup of this.popups.filter(m => !m.hasMap)) {
          popup.addToMap(this._map);
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._map) {
      this.setOptions();

      if (changes.dataSources) {
        this.updateDataSources();
      }

      if (changes.cursor) {
        this._map.getCanvasContainer().style.cursor = this.cursor;
      }
    }
  }

  constructor(private readonly elementRef: ElementRef) {

  }

  private updateDataSources(): void {

    let drawingToolbarSourceId = null;
    let previewToolbarSourceId = null;
    if (this.drawingToolbar) {
      drawingToolbarSourceId = this.drawingToolbar.getDatasource().getId();
      previewToolbarSourceId = this.drawingToolbar.getPreviewSource().getId();
    }

    const mapSources = this._map.sources.getSources()
      .filter(s =>
        s.getId() !== 'vectorTiles'
        && s.getId() !== 'incidents-source'
        && (drawingToolbarSourceId && s.getId() !== drawingToolbarSourceId)
        && (previewToolbarSourceId && s.getId() !== previewToolbarSourceId))
      .map(s => s.getId());

    if ((!this.dataSources || this.dataSources.length === 0) && (mapSources && mapSources.length > 0)) {
      this._map.sources.clear();
    } else if (this.dataSources) {
      const dataSourcesToAdd = this.dataSources.filter(ds => ds && !this._map.sources.getById(ds.getId()));
      const dataSourcesToRemove = mapSources.filter(id => !this.dataSources.find(s => s && s.getId() === id));

      this._map.sources.add(dataSourcesToAdd);

      for (const sourceId of dataSourcesToRemove) {
        const layer = this.sourceLayers.find(l => sourceId && l.dataSourceId === sourceId);
        if (layer) {
          layer.clear(this._map);
        }
      }

      this._map.sources.remove(dataSourcesToRemove);
    }
  }

  private setOptions(): void {
    const cameraOptions: (atlas.CameraOptions | atlas.CameraBoundsOptions) & atlas.AnimationOptions = {
      bearing: this.bearing,
      centerOffset: this.centerOffset,
      duration: this.duration,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      pitch: this.pitch,
      type: this.cameraType
    };

    if (this.bounds) {
      cameraOptions.bounds = this.bounds;
      cameraOptions.maxBounds = this.maxBounds;
      cameraOptions.offset = this.offset;
      cameraOptions.padding = this.padding;
    } else {
      cameraOptions.center = this.center;
      cameraOptions.zoom = this.zoom;
    }

    this._map.setCamera(cameraOptions);

    this._map.setStyle({
      autoResize: this.autoResize,
      language: this.language,
      light: this.light,
      preserveDrawingBuffer: this.preserveDrawingBuffer,
      renderWorldCopies: this.renderWorldCopies,
      showBuildingModels: this.showBuildingModels,
      showFeedbackLink: this.showFeedbackLink,
      showLogo: this.showLogo,
      showTileBoundaries: this.showTilesBoundary,
      style: this.mapStyle,
      view: this.view
    });

    this._map.setUserInteraction({
      boxZoomInteraction: this.boxZoomInteraction,
      dblclickZoomInteraction: this.dblclickZoomInteraction,
      dragPanInteraction: this.dragPanInteraction,
      dragRotateInteraction: this.dragRotateInteraction,
      interactive: this.interactive,
      keyboardInteraction: this.keyboardInteraction,
      scrollZoomInteraction: this.scrollZoomInteraction,
      touchInteraction: this.touchInteraction,
      wheelZoomRate: this.wheelZoomRate
    });

    if (this.trafficOptions) {
      this._map.setTraffic(this.trafficOptions);
    }
  }

  private toMapEvent(e: any): IMapEvent {
    return {
      event: e,
      map: this._map
    };
  }

}
