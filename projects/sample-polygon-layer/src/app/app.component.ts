import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map [zoom]="zoom" [dataSources]="[dataSource]" (onReady)="mapReady()">' +
    '<map-polygon-layer dataSourceId="source" [fillColor]="fillColor" [fillOpacity]="fillOpacity"></map-polygon-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;
  public fillOpacity = 0.5;
  public fillColor = '#1a73aa';

  public zoom = 2;

  mapReady() {
    this.dataSource = new atlas.source.DataSource('source');
    this.dataSource.add(new atlas.data.Polygon([
      [-50, -20],
      [0, 40],
      [50, -20],
      [-50, -20]
    ]));
  }

}
