import { Component } from '@angular/core';
import { WeatherService } from 'ng-azure-maps';

@Component({
  selector: 'app-root',
  template: '<azure-map [center]="[11.578227, 48.135188]" [zoom]="10" mapStyle="grayscale_light" (onReady)="mapReady()">' +
    '<map-html-marker [position]="[11.578227, 48.135188]">' +
    '</map-html-marker>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly weatherService: WeatherService) {

  }

  mapReady() {
    this.weatherService.getCurrentConditions(11.578227, 48.135188).subscribe(result => {
      console.log(result);
    });
  }

}
