import { Component } from '@angular/core';
import { SearchService, IMapEvent } from 'ng-azure-maps';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map mapStyle="grayscale_dark" [dataSources]="[dataSource]" (onReady)="mapReady($event)">' +
    '<symbol-layer dataSourceId="search" [iconOptions]="iconOptions"></symbol-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;

  public iconOptions: atlas.IconOptions = {
    image: 'beer',
    size: 0.2
  };

  constructor(private readonly searchService: SearchService) {
  }

  mapReady(event: IMapEvent) {
    event.map.imageSprite.add('beer', 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678063-beer-128.png').then(() => {
      this.dataSource = new atlas.source.DataSource('search');
      this.searchService.searchFuzzy("Biergarten", {
        lat: 48.143534,
        lon: 11.581990,
        radius: 100000
      }).then(results => {
        const features = results.geojson.getFeatures();
        this.dataSource.add(features);
        event.map.setCamera({
          bounds: features.bbox,
          padding: 35
        });
      });
    });
  }

}
