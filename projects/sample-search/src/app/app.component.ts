import { Component } from '@angular/core';
import { SearchService, IMapEvent } from 'ng-azure-maps';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map mapStyle="grayscale_dark" (onReady)="mapReady($event)">' +
    '<map-symbol-layer dataSourceId="search"></map-symbol-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;

  constructor(private readonly searchService: SearchService) {
  }

  mapReady(event: IMapEvent) {
    this.searchService.searchAddress("Marienplatz, Munich").subscribe(response => {

      const features = [];
      for (const result of response.results) {
        event.map.markers.add(new atlas.HtmlMarker({
          position: [result.position.lon, result.position.lat]
        }));
        features.push(new atlas.data.Point([result.position.lon, result.position.lat]));
      }

      event.map.setCamera({
        bounds: atlas.data.BoundingBox.fromData(features)
      });
    });
  }

}
