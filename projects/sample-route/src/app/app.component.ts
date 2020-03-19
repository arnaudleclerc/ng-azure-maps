import { Component } from '@angular/core';
import { IMapEvent, RouteService, } from 'ng-azure-maps';
import * as rest from 'azure-maps-rest';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map (onClick)="mapClick($event)" [center]="center" [zoom]="zoom" cursor="pointer" [dataSources]="[route]">' +
    '<html-marker *ngFor="let point of points" [position]="point"></html-marker>' +
    '<line-layer dataSourceId="route"></line-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public points: [number, number][] = [];
  public route = new atlas.source.DataSource('route');
  public zoom = 10;
  public center = [11.581990, 48.143534];

  constructor(private readonly routeService: RouteService) { }

  mapClick(mapEvent: IMapEvent) {
    if (this.points.length === 2) {
      this.points.length = 0;
    }

    this.route.clear();
    this.points.push(mapEvent.event.position);

    if (this.points.length === 2) {
      this.routeService.calculateRouteDirections(this.points, {
        routeType: rest.Models.RouteType.Shortest
      }).then(result => {
        const features = result.geojson.getFeatures();
        this.route.add(features.features);
        mapEvent.map.setCamera({
          bounds: features.bbox,
          padding: 35
        });
      });
    }
  }

}
