import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map zoom="2" [mapStyle]="mapStyle" (onLoad)="mapLoad()" [dataSources]="[dataSource]">' +
    '<heatmap-layer [weight]="weight" [radius]="radius" dataSourceId="source"></heatmap-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;
  public mapStyle = "grayscale_dark";
  public weight: any = ['get', 'Confirmed'];
  public radius = 20;

  mapLoad() {
    this.dataSource = new atlas.source.DataSource('source');
    this.dataSource.importDataFromUrl('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?where=1%3D1&f=geojson&outFields=*');
  }

}
