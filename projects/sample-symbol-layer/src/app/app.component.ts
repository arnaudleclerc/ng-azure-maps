import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
    selector: 'app-root',
    template: '<azure-map zoom="2" [dataSources]="[dataSource, dataSourceRed]" (onReady)="mapReady()">' +
        '<map-symbol-layer dataSourceId="blue" (onMouseEnter)="mouseInteraction(\'blue\')"></map-symbol-layer>' +
        '<map-symbol-layer dataSourceId="red" [iconOptions]="redIconOptions" (onMouseLeave)="mouseInteraction(\'red\')"></map-symbol-layer>' +
        '</azure-map>',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;
  public dataSourceRed: atlas.source.DataSource;

  public redIconOptions: atlas.IconOptions = {
    image: 'pin-red'
  };

  mapReady() {
    this.dataSource = new atlas.source.DataSource('blue');
    this.dataSourceRed = new atlas.source.DataSource('red');
    for (let i = 0; i < 10; i++) {
      const point = new atlas.Shape(new atlas.data.Point([i * 5, i * 5]));
      this.dataSource.add([point]);
      const redPoint = new atlas.Shape(new atlas.data.Point([i * -5, i * 5]));
      this.dataSourceRed.add([redPoint]);
    }
  }

  public mouseInteraction(color: string): void {
    console.log(color);
  }

}
