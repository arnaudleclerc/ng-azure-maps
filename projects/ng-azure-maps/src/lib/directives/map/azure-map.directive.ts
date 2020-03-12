import { Directive, AfterViewInit, ElementRef, Inject, Input, Output, OnDestroy, ContentChild, Query, QueryList, AfterContentChecked, ContentChildren } from '@angular/core';
import { Map, LightOptions, MapEvent, MapErrorEvent } from 'azure-maps-control';
import { AZUREMAPS_CONFIG, AzureMapsConfiguration } from '../../configuration';
import { Subject } from 'rxjs';
import * as atlas from 'azure-maps-control';
import { ZoomControlDirective } from '../controls/zoom-control.directive';
import { PitchControlDirective } from '../controls/pitch-control.directive';
import { CompassControlDirective } from '../controls/compass-control.directive';
import { StyleControlDirective } from '../controls/style-control.directive';
import { HtmlMarkerDirective } from '../markers/html-marker.directive';

@Directive({
  selector: '[azure-map], azure-map',
  queries: {
    zoomControl: new ContentChild(ZoomControlDirective),
    pitchControl: new ContentChild(PitchControlDirective),
    compassControl: new ContentChild(CompassControlDirective),
    styleControl: new ContentChild(StyleControlDirective),
    htmlMarkers: new ContentChildren(HtmlMarkerDirective)
  }
})
export class AzureMapDirective
  implements AfterViewInit, OnDestroy {

  private _map: Map;

  @Input() public autoResize: boolean;
  @Input() public bearing: number;
  @Input() public bounds: [number, number, number, number];
  @Input() public boxZoomInteraction: boolean
  @Input() public center: [number, number];
  @Input() public centerOffset: [number, number];
  @Input() public dblClickZoomInteraction: boolean;
  @Input() public disableTelemetry: boolean;
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
  @Input() public padding: { top: number, bottom: number, left: number, right: number };
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

  @Output() public error = new Subject<MapErrorEvent>();
  @Output() public ready = new Subject<MapEvent>();

  public zoomControl: ZoomControlDirective;
  public pitchControl: PitchControlDirective;
  public compassControl: CompassControlDirective;
  public styleControl: StyleControlDirective;

  public htmlMarkers: QueryList<HtmlMarkerDirective>;

  ngAfterViewInit(): void {
    this._map = new Map(this.elementRef.nativeElement, {
      authOptions: this.azureMapsConfiguration.authOptions,
      autoResize: this.autoResize,
      bearing: this.bearing,
      bounds: this.bounds,
      boxZoomInteraction: this.boxZoomInteraction,
      center: this.center,
      centerOffset: this.centerOffset,
      dblClickZoomInteraction: this.dblClickZoomInteraction,
      disableTelemetry: this.disableTelemetry,
      domain: this.domain,
      dragPanInteraction: this.dragPanInteraction,
      dragRotateInteraction: this.dragRotateInteraction,
      enableAccessibility: this.enableAccessibility,
      interactive: this.interactive,
      keyboardInteraction: this.keyboardInteraction,
      language: this.language,
      light: this.light,
      maxBounds: this.maxBounds,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      offset: this.offset,
      padding: this.padding,
      pitch: this.pitch,
      preserveDrawingBuffer: this.preserveDrawingBuffer,
      refreshExpiredTiles: this.refreshExpiredTiles,
      renderWorldCopies: this.renderWorldCopies,
      scrollZoomInteraction: this.scrollZoomInteraction,
      showBuildingModels: this.showBuildingModels,
      showFeedbackLink: this.showFeedbackLink,
      showLogo: this.showLogo,
      showTileBoundaries: this.showTilesBoundary,
      touchInteraction: this.touchInteraction,
      view: this.view,
      wheelZoomRate: this.wheelZoomRate,
      style: this.mapStyle,
      zoom: this.zoom
    });

    this._map.events.add('error', e => {
      this.error.next(e);
    });

    this._map.events.addOnce('ready', e => {
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

      if (this.htmlMarkers) {
        for (const htmlMarker of this.htmlMarkers) {
          htmlMarker.addToMap(this._map);
        }
      }

    });
  }

  ngOnDestroy() {
    this.error.unsubscribe();
    this.ready.unsubscribe();
  }

  constructor(@Inject(AZUREMAPS_CONFIG) private readonly azureMapsConfiguration: AzureMapsConfiguration,
    private readonly elementRef: ElementRef) {

  }

}
