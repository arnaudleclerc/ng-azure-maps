import { Component } from '@angular/core';
import { WeatherService, CurrentConditions } from 'ng-azure-maps';

@Component({
    selector: 'app-root',
    template: '<azure-map [center]="center" [zoom]="10" mapStyle="grayscale_light" (onReady)="getCurrentWeather(center)" (onClick)="getCurrentWeather($event.event.position)">' +
        '<map-popup [content]="content" [position]="markerPosition" [opened]="!!currentConditions" [closeButton]="false" [pixelOffset]="[0,-36]"></map-popup>' +
        '<map-html-marker [position]="markerPosition">' +
        '</map-html-marker>' +
        '</azure-map>',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  content: string;
  popupTemplate = '<div class="infobox"><img src="{iconsrc}" /></div>';
  center = [11.578227, 48.135188];
  markerPosition = [11.578227, 48.135188];

  currentConditions: CurrentConditions;

  constructor(private readonly weatherService: WeatherService) {

  }

  getCurrentWeather(position: number[]) {
    this.currentConditions = null;
    this.markerPosition = position;

    this.weatherService.getCurrentConditions(this.markerPosition[0], this.markerPosition[1]).subscribe(result => {
      console.log(result);
      this.currentConditions = result.results[0];
      this.content = this.popupTemplate.replace(/{iconsrc}/g, `/assets/weather-icons/${this.currentConditions.iconCode}.png`);
    });
  }

}
