import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map zoom="2" [dataSources]="[dataSource]" (onLoad)="mapLoad()">' +
    '<bubble-layer dataSourceId="source" [strokeColor]="strokeColor" [strokeWidth]="strokeWidth" [color]="color" [radius]="radius"></bubble-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;
  public strokeColor = '#4288f7';
  public strokeWidth = 6;
  public radius = 5;
  public color = "white";

  mapLoad() {
    this.dataSource = new atlas.source.DataSource('source');
    for (let i = 0; i < 10; i++) {
      const point = new atlas.Shape(new atlas.data.Point([i * 5, i * 5]));
      this.dataSource.add([point]);
    }
  }

}
