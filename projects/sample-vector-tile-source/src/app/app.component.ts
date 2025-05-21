import { Component, OnInit } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
    selector: 'app-root',
    template: '<azure-map [zoom]="zoom" [center]="center" [mapStyle]="mapStyle" [dataSources]="[source]" (onReady)="mapReady()">' +
        '<map-line-layer sourceLayer="Traffic flow" before="labels" dataSourceId="source" [strokeColor]="strokeColor" [strokeWidth]="strokeWidth"></map-line-layer>' +
        '</azure-map>',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  public source: atlas.source.VectorTileSource;
  public strokeColor;
  public strokeWidth;

  public zoom = 12;
  public center = [-74, 40.723];

  public mapStyle = "grayscale_dark";

  mapReady() {
    this.source = new atlas.source.VectorTileSource('source', {
      tiles: ['https://{azMapsDomain}/traffic/flow/tile/pbf?api-version=1.0&style=relative&zoom={z}&x={x}&y={y}']
    });

    this.strokeColor = [
      'step',
      ['get', 'traffic_level'],
      '#6B0512', //Dark red
      0.01, '#EE2F53', //Red
      0.8, 'orange', //Orange
      1, "#66CC99" //Green
    ]

    //Scale the width of roads based on the traffic_level property.
    this.strokeWidth = [
      'interpolate',
      ['linear'],
      ['get', 'traffic_level'],
      0, 6,
      1, 1
    ];
  }

}
