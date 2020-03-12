import { Directive, AfterViewInit, ElementRef, Inject, Input, Output, OnDestroy, ContentChild, Query, QueryList } from '@angular/core';
import { Map, LightOptions, MapEvent, MapErrorEvent } from 'azure-maps-control';
import { AZUREMAPS_CONFIG, AzureMapsConfiguration } from '../configuration';
import { Subject } from 'rxjs';
import * as atlas from 'azure-maps-control';
import { ZoomControlDirective } from './zoom-control.directive';
import { PitchControlDirective } from './pitch-control.directive';

@Directive({
  selector: '[azure-map]',
  queries: {
    zoomControl: new ContentChild(ZoomControlDirective),
    pitchControl: new ContentChild(PitchControlDirective)
  }
})
export class AzureMapDirective
  implements AfterViewInit, OnDestroy {

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

  ngAfterViewInit(): void {
    const map = new Map(this.elementRef.nativeElement, {
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

    map.events.add('error', e => {
      this.error.next(e);
    });

    map.events.addOnce('ready', e => {
      this.ready.next(e);

      if (this.zoomControl) {
        this.zoomControl.initialize(map);
      }

      if (this.pitchControl) {
        this.pitchControl.initialize(map);
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
