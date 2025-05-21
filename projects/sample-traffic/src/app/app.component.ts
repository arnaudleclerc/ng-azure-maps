import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
    selector: 'app-root',
    template: '<azure-map [center]="[11.47, 48.18]" [zoom]="10" mapStyle="grayscale_light" [trafficOptions]="trafficOptions"></azure-map>',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  trafficOptions: atlas.TrafficOptions = {
    flow: "relative",
    incidents: true
  };

}
