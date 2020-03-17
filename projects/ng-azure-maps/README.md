[![Build status](https://dev.azure.com/aleclerc/ng-azure-maps/_apis/build/status/ng-azure-maps)](https://dev.azure.com/aleclerc/ng-azure-maps/_build/latest?definitionId=15) 
[![NPM Version](https://img.shields.io/npm/v/ng-azure-maps.svg?style=flat)](https://www.npmjs.com/package/ng-azure-maps)

# ng-azure-maps 

This is a WIP of an Angular wrapper around the azure-maps-control package. It exposes some directives making it easy to integrate azure-maps on an Angular application.

![4 Maps sample](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/4mapssample.png)

## Register the module

An `AzureMapsModule` can be imported from the `ng-azure-maps` namespace. This class exposes a `forRoot` method which can be called by your angular module and where the configuration of the library can be given.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AzureMapsModule } from 'ng-azure-maps';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AzureMapsModule.forRoot({
      authOptions: environment.authOptions
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

AAD and SubscriptionKey authentication are supported.

## How to

Please note that all the directives can be used either as html tag or applied to an html element as an attribute tag. For example, the map can be displayed using `<azure-map></azure-map>` or `<div azure-map></div>`.

## Display a map

Use the `azure-map` directive to display a map.

```
<azure-map></azure-map>
```

![Azure Map](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/azure-map/azure-map.png) 

You can specify different inputs on the `azure-map` directive to customize your display. Please refer to the [Azure Maps Web SDK Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-create) for more information.

```
<azure-map [center]="[11.47, 48.18]" mapStyle='grayscale_dark'></azure-map>
```

NB: To avoid conflict with the `style` html tag, the style to apply to the map can be found under `mapStyle` instead. The same applied to the `type` of camera which has been renamed to `cameraType`.

```
<azure-map [center]="[11.47, 48.18]" mapStyle='grayscale_dark' [zoom]="10"></azure-map>
```

![Custom Azure Map](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/azure-map/azure-map-custom.png) 

For now, only the `ready` and `error` events are available as Output of the `azure-map` directive.

## Add controls

Compass, pitch, style and zoom controls have their own directive, each of them accepting a position binding.

```
<azure-map>
  <zoom-control position='top-left'></zoom-control>
  <pitch-control position="top-right"></pitch-control>
  <compass-control position="bottom-left"></compass-control>
  <style-control position="bottom-right"></style-control>
</azure-map>
```

![Controls](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/controls/controls.png) 

## HtmlMarkers

You can add HTML Markers to the map using the `html-marker` directive. Please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-add-custom-html) concerning the available options. The map and the HTML Markers listen to the changes on the provided markers and will update them accordingly.

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<azure-map (ready)="mapReady()">' +
    '<html-marker *ngFor="let markerPosition of markerPositions" [position]="markerPosition">' +
    '</html-marker>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public markerPositions: [number, number][] = [];

  mapReady() {
    for (let i = 0; i < 10; i++) {
      this.markerPositions.push([i * 5, i * 5]);
    }
  }
}
```

![HTML Markers](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/markers/html-markers.png) 

## Drawing toolbar

The drawing toolbar can be added using the `drawing-toolbar` directive. 

The `drawingChanged`, `drawingChanging`, `drawingComplete`, `drawingModeChanged` and `drawingStarted` events are available as Output of the directive.

```
<azure-map>
  <drawing-toolbar position="top-right" toolbarStyle="dark"></drawing-toolbar>
</azure-map>
```

NB: To avoid conflict with the `style` html tag, the style to apply to the toolbar can be found under `toolbarStyle` instead.

Please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-add-drawing-toolbar) for customization and events.

![HTML Markers](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/drawing-toolbar/drawing-toolbar.png) 

## Layers

The layers are directly linked to the map and one of its datasources. A data source can be added directly as a binding on the `azure-map` directive.

```
<azure-map [dataSources]="[dataSource, dataSourceRed]"></azure-map>
```

### Symbol Layers

A symbol layer can be added using the `symbol-layer` directive. The id of the data source to display on the layer can be specified on the `dataSourceId` binding on the directive.

For more information on the customization of the layer, please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-add-pin).

```
import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map zoom="2" [dataSources]="[dataSource, dataSourceRed]" (ready)="mapReady()">' +
    '<symbol-layer dataSourceId="blue"></symbol-layer>' +
    '<symbol-layer dataSourceId="red" [iconOptions]="redIconOptions"></symbol-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
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

}
```

![Symbol Layer](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/layers/symbol-layer.png)

### Bubble layers

A bubble layer can be added using the `bubble-layer` directive. The id of the data source to display on the layer can be specified on the `dataSourceId` binding on the directive.

For more information on the customization of the layer, please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-add-bubble-layer).

```
import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map zoom="2" [dataSources]="[dataSource]" (ready)="mapReady()">' +
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

  mapReady() {
    this.dataSource = new atlas.source.DataSource('source');
    for (let i = 0; i < 10; i++) {
      const point = new atlas.Shape(new atlas.data.Point([i * 5, i * 5]));
      this.dataSource.add([point]);
    }
  }

}
```

![Bubble Layer](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/layers/bubble-layer.png)

### Line layers

A line layer can be added using the `line-layer` directive. The id of the data source to display on the layer can be specified on the `dataSourceId` binding on the directive.

For more information on the customization of the layer, please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-add-line-layer).

```
import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map [zoom]="zoom" [center]="center" [mapStyle]="mapStyle" [dataSources]="[dataSource]" (ready)="mapReady()">' +
    '<line-layer dataSourceId="source" [strokeGradient]="strokeGradient" [strokeWidth]="strokeWidth"></line-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;
  public strokeWidth = 6;
  public strokeGradient: atlas.Expression = [
    'interpolate',
    ['linear'],
    ['line-progress'],
    0, "blue",
    0.1, "royalblue",
    0.3, "cyan",
    0.5, "lime",
    0.7, "yellow",
    1, "red"
  ];

  public zoom = 14;
  public center = [11.581990, 48.143534];

  public mapStyle = "grayscale_dark";

  mapReady() {
    this.dataSource = new atlas.source.DataSource('source');

    this.dataSource.add(new atlas.data.LineString([
      [11.575454, 48.137392],
      [11.576029, 48.137094],
      [11.577248, 48.138912],
      [11.578434, 48.138737],
      [11.578826, 48.139409],
      [11.580140, 48.139179],
      [11.581237, 48.141555],
      [11.581155, 48.141852],
      [11.581990, 48.143534],
      [11.583355, 48.143896],
      [11.583662, 48.144258],
      [11.585458, 48.145596],
      [11.587910, 48.145779],
      [11.589632, 48.146608],
      [11.590771, 48.148219],
      [11.591979, 48.150743],
      [11.592885, 48.150611],
      [11.593161, 48.150874],
      [11.593594, 48.151084],
      [11.594028, 48.151803],
      [11.592281, 48.152074],
    ]));
  }

}
```

![Line Layer](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/layers/line-layer.png)

### Polyon layers

A polygon layer can be added using the `polygon-layer` directive. The id of the data source to display on the layer can be specified on the `dataSourceId` binding on the directive.

For more information on the customization of the layer, please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-add-shape).

```
import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map [zoom]="zoom" [dataSources]="[dataSource]" (ready)="mapReady()">' +
    '<polygon-layer dataSourceId="source" [fillColor]="fillColor" [fillOpacity]="fillOpacity"></polygon-layer>' +
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
```

![Polygon Layer](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/layers/polygon-layer.png)

### Polyon extrusion layers

A polygon extrusion layer can be added using the `polygon-extrusion-layer` directive. The id of the data source to display on the layer can be specified on the `dataSourceId` binding on the directive.

For more information on the customization of the layer, please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-extruded-polygon).

```
<azure-map [center]="[11.47, 48.18]" zoom="4" pitch="45" view="Auto" (ready)="mapReady()" [dataSources]="[dataSource]">
  <polygon-extrusion-layer dataSourceId="source" [base]="base" [fillColor]="fillColor" [fillOpacity]="fillOpacity"
    [height]="height"></polygon-extrusion-layer>
  <div class="legend">
    Population Density (people/km<sup>2</sup>)
    <p>
      <i [style.background]="defaultColor"></i> 0-{{colorScale[0]}}
    </p>
    <p *ngFor="let legendItem of legend">
      <i [style.background]="legendItem.color"></i> {{legendItem.label}}
    </p>
  </div>
</azure-map>
```

```
import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;
  public readonly defaultColor = '#00ff80';
  public readonly colorScale: any = [
    10, '#09e076',
    20, '#0bbf67',
    50, '#f7e305',
    100, '#f7c707',
    200, '#f78205',
    500, '#f75e05',
    1000, '#f72505',
    10000, '#6b0a05'
  ];

  public get legend(): { color: string, label: string }[] {
    const result = [];
    for (let i = 0; i < this.colorScale.length; i += 2) {
      result.push({ color: this.colorScale[i + 1], label: this.colorScale[i + 2] ? `${this.colorScale[i]} - ${this.colorScale[i + 2]}` : `${this.colorScale[i]} +` });
    }
    return result;
  }

  public fillColor: any = [
    'step',
    ['get', 'DENSITY'],
    this.defaultColor
  ].concat(this.colorScale);

  public height: any = [
    'interpolate',
    ['linear'],
    ['get', 'DENSITY'],
    0, 100,
    1200, 960000
  ];

  public base = 100;
  public fillOpacity = 0.7;

  mapReady() {
    this.dataSource = new atlas.source.DataSource('source');
    this.dataSource.importDataFromUrl('https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/data/countries.geojson.json');
  }

}
```

![Polygon Extrusion Layer](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/layers/polygon-extrusion-layer.png)

### Heatmap layers

A heatmap layer can be added using the `heatmap-layer` directive. The id of the data source to display on the layer can be specified on the `dataSourceId` binding on the directive.

For more information on the customization of the layer, please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-add-heat-map-layer).

```
import { Component } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-root',
  template: '<azure-map zoom="2" [mapStyle]="mapStyle" (ready)="mapReady()" [dataSources]="[dataSource]">' +
    '<heatmap-layer [weight]="weight" [radius]="radius" dataSourceId="source"></heatmap-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dataSource: atlas.source.DataSource;
  public mapStyle = "grayscale_dark";
  public weight: any = ['get', 'Confirmed'];
  public radius = 20;

  mapReady() {
    this.dataSource = new atlas.source.DataSource('source');
    this.dataSource.importDataFromUrl('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?where=1%3D1&f=geojson&outFields=*');
  }

}
```

![Heatmap Layer](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/layers/heatmap-layer.png)

### Image layers

An image layer can be added using the `image-layer` directive.

For more information on the customization of the layer, please refer to the [Azure Maps Documentation](https://docs.microsoft.com/en-us/azure/azure-maps/map-add-image-layer).

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<azure-map [center]="[11.575454, 48.137392]" zoom="13">' +
    '<image-layer url="https://ngazuremaps.blob.core.windows.net/images/munich_1858.jpg" [coordinates]="coordinates">' +
    '</image-layer>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public coordinates = [
    [11.540774, 48.151994],
    [11.598952, 48.151994],
    [11.598952, 48.127172],
    [11.540774, 48.127172]
  ]
}
```

![Image Layer](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/layers/image-layer.png)
