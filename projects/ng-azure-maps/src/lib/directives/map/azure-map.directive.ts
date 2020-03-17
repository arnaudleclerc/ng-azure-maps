import { Directive, AfterViewInit, ElementRef, Inject, Input, Output, OnDestroy, ContentChild, QueryList, AfterContentChecked, ContentChildren, OnChanges, SimpleChanges } from '@angular/core';
import { Map, LightOptions, MapEvent, MapErrorEvent, CameraOptions, CameraBoundsOptions, AnimationOptions } from 'azure-maps-control';
import { AZUREMAPS_CONFIG, AzureMapsConfiguration } from '../../configuration';
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
import { LayerDirective } from '../layers/layer-directive';
import { LineLayerDirective } from '../layers/line-layer.directive';
import { PolygonLayerDirective } from '../layers/polygon-layer.directive';
import { PolygonExtrusionLayerDirective } from '../layers/polygon-extrusion-layer.directive';
import { HeatmapLayerDirective } from '../layers/heatmap-layer.directive';

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
    heatmapLayers: new ContentChildren(HeatmapLayerDirective)
  }
})
export class AzureMapDirective
  implements AfterViewInit, OnDestroy, AfterContentChecked, OnChanges {

  private _map: Map;

  @Input() public autoResize: boolean;
  @Input() public bearing: number;
  @Input() public bounds: [number, number, number, number];
  @Input() public boxZoomInteraction: boolean;
  @Input() public cameraType: "jump" | "ease" | "fly";
  @Input() public center: [number, number];
  @Input() public centerOffset: [number, number];
  @Input() public dblClickZoomInteraction: boolean;
  @Input() public disableTelemetry: boolean;
  @Input() public duration: number;
  @Input() public domain: string;
  @Input() public dragPanInteraction: boolean;
  @Input() public dragRotateInteraction: boolean;
  @Input() public enableAccessibility: boolean;
  @Input() public interactive: boolean;
  @Input() public keyboardInteraction: boolean;
  @Input() public language: string;
  @Input() public light: LightOptions;
  @Input() public maxBounds: atlas.data.BoundingBox;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public offset: [number, number];
  @Input() public padding: { top: 0, bottom: 0, left: 0, right: 0 };
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

  @Input() public dataSources: atlas.source.DataSource[];

  @Output() public error = new Subject<MapErrorEvent>();
  @Output() public ready = new Subject<MapEvent>();

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

  private get layers(): LayerDirective<atlas.layer.Layer>[] {
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
    const map = new Map(this.elementRef.nativeElement, <atlas.ServiceOptions>{
      authOptions: this.azureMapsConfiguration.authOptions,
      disableTelemetry: this.disableTelemetry,
      domain: this.domain,
      enableAccessibility: this.enableAccessibility,
      refreshExpiredTiles: this.refreshExpiredTiles
    });

    map.events.add('error', e => {
      this.error.next(e);
    });

    map.events.addOnce('ready', e => {

      this._map = map;

      this.setOptions();

      this.ready.next(e);

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
  }

  ngAfterContentChecked() {
    if (this._map) {
      if (this.htmlMarkers) {
        for (const marker of this.htmlMarkers.filter(m => !m.hasMap)) {
          marker.addToMap(this._map);
        }
      }

      if (this.layers.length > 0) {
        for (const layer of this.layers.filter(l => !l.hasLayer)) {
          layer.initialize(this._map, this.dataSources.find(d => d.getId() === layer.dataSourceId));
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._map) {
      this.setOptions();

      if (changes['dataSources']) {
        this.updateDataSources();
      }
    }
  }

  ngOnDestroy() {
    this.error.unsubscribe();
    this.ready.unsubscribe();
  }

  constructor(@Inject(AZUREMAPS_CONFIG) private readonly azureMapsConfiguration: AzureMapsConfiguration,
    private readonly elementRef: ElementRef) {

  }

  private updateDataSources(): void {
    const mapSources = this._map.sources.getSources().filter(s => s.getId() !== "vectorTiles");
    if ((!this.dataSources || this.dataSources.length === 0) && (mapSources && mapSources.length > 0)) {
      this._map.sources.clear();
    } else if (this.dataSources) {
      const dataSourcesToAdd = this.dataSources.filter(ds => ds && !this._map.sources.getById(ds.getId()));
      const dataSourcesToRemove = mapSources.filter(ds => !this.dataSources.find(s => s && s.getId() === ds.getId()));

      this._map.sources.add(dataSourcesToAdd);
      this._map.sources.remove(dataSourcesToRemove);
    }
  }

  private setOptions(): void {
    const cameraOptions: (CameraOptions | CameraBoundsOptions) & AnimationOptions = {
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
      dblClickZoomInteraction: this.dblClickZoomInteraction,
      dragPanInteraction: this.dragPanInteraction,
      dragRotateInteraction: this.dragRotateInteraction,
      interactive: this.interactive,
      keyboardInteraction: this.keyboardInteraction,
      scrollZoomInteraction: this.scrollZoomInteraction,
      touchInteraction: this.touchInteraction,
      wheelZoomRate: this.wheelZoomRate
    });
  }

}
