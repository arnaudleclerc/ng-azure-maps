import { Component } from '@angular/core';
import { SearchService, IMapEvent } from 'ng-azure-maps';
import * as atlas from 'azure-maps-control';

@Component({
    selector: 'app-root',
    template: '<azure-map mapStyle="grayscale_dark" (onReady)="mapReady($event)">' +
        '<map-symbol-layer dataSourceId="search"></map-symbol-layer>' +
        '</azure-map>',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;

  constructor(private readonly searchService: SearchService) {
  }

  mapReady(event: IMapEvent) {

    this.searchService.searchInsideGeometry('pizza', {
      "geometry": {
        "type": "GeometryCollection",
        "geometries": [
          {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -122.43576049804686,
                  37.7524152343544
                ],
                [
                  -122.43301391601563,
                  37.706604725423119
                ],
                [
                  -122.36434936523438,
                  37.712059855877314
                ],
                [
                  -122.43576049804686,
                  37.7524152343544
                ]
              ]
            ]
          },
          {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -123.43576049804686,
                  37.7524152343544
                ],
                [
                  -123.43301391601563,
                  37.706604725423119
                ],
                [
                  -123.36434936523438,
                  37.712059855877314
                ],
                [
                  -123.43576049804686,
                  37.7524152343544
                ]
              ]
            ]
          }
        ]
      }
    }, {
      limit: 2,
      openingHours: "nextSevenDays"
    }).subscribe(response => {
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
