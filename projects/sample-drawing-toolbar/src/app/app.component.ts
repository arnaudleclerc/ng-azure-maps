import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'angular-azure-maps';

  public dataSource: atlas.source.DataSource;
  public strokeColor = '#4288f7';
  public strokeWidth = 1;
  public radius = 7;
  public color = "DodgerBlue";
  public center = [-92.0076434351666, 42.31463750062173];
  public zoom = 6;
  public mapStyle = 'grayscale_light';

  mapReady() {
    this.dataSource = new atlas.source.DataSource('source');
    const point1 = new atlas.Shape(new atlas.data.Point([-92.0076434351666, 42.31463750062173]));
    this.dataSource.add([point1]);
    const point2 = new atlas.Shape(new atlas.data.Point([-92.76434351666, 42.463750062173]));
    this.dataSource.add([point2]);
    const point3 = new atlas.Shape(new atlas.data.Point([-92.25436, 42.4773]));
    this.dataSource.add([point3]);
  }

  drawingStarted(value: any) {
  }
  drawingChanged(value: any) {
  }
  drawingChanging(value: any) {
  }
  drawingComplete(value: any) {
  }
  drawingModeChanged(value: any) {
  }
}
