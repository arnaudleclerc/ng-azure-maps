import { Directive, AfterViewInit, ElementRef, Inject, Input, Output } from '@angular/core';
import { Map } from 'azure-maps-control';
import { AZUREMAPS_CONFIG, AzureMapsConfiguration } from '../configuration';
import { Subject } from 'rxjs';

@Directive({
  selector: '[azure-map]'
})
export class AzureMapDirective
  implements AfterViewInit {

  @Input() public center: [number, number];
  @Input() public mapStyle: string;
  @Input() public view: string;
  @Input() public zoom: number;

  @Output("ready") public ready = new Subject<Map>();

  ngAfterViewInit(): void {
    const map = new Map(this.elementRef.nativeElement, {
      authOptions: this.azureMapsConfiguration.authOptions,
      center: this.center,
      style: this.mapStyle,
      view: this.view,
      zoom: this.zoom
    });

    map.events.addOnce('ready', () => {
      this.ready.next(map);
    });
  }

  constructor(@Inject(AZUREMAPS_CONFIG) private readonly azureMapsConfiguration: AzureMapsConfiguration,
    private readonly elementRef: ElementRef) {

  }

}
