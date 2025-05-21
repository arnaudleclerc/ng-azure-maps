import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'ng-azure-maps';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    standalone: false
})
export class MapComponent implements OnInit {
  constructor(private readonly _weatherService: WeatherService) {

  }

  ngOnInit() {
    this._weatherService.getCurrentConditions(11.578227, 48.135188).subscribe(result => {
      console.log(result);
    });
  }

}
