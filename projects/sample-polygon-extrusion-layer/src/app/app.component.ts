import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;
  public readonly defaultColor = '#00ff80';
  public readonly colorScale: any = [
    10, '#09e076',
    20, '#0bbf67',
    50, '#f7e305',
    100, '#f7c707',
    200, '#f78205',
    500, '#f75e05',
    1000, '#f72505',
    10000, '#6b0a05'
  ];

  public get legend(): { color: string, label: string }[] {
    const result = [];
    for (let i = 0; i < this.colorScale.length; i += 2) {
      result.push({ color: this.colorScale[i + 1], label: this.colorScale[i + 2] ? `${this.colorScale[i]} - ${this.colorScale[i + 2]}` : `${this.colorScale[i]} +` });
    }
    return result;
  }

  public fillColor: any = [
    'step',
    ['get', 'DENSITY'],
    this.defaultColor
  ].concat(this.colorScale);

  public height: any = [
    'interpolate',
    ['linear'],
    ['get', 'DENSITY'],
    0, 100,
    1200, 960000
  ];

  public base = 100;
  public fillOpacity = 0.7;

  mapReady() {
    this.dataSource = new atlas.source.DataSource('source');
    this.dataSource.importDataFromUrl('https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/data/countries.geojson.json');
  }

}
