# ng-azure-maps 

This is a WIP of an Angular wrapper around the azure-maps-control package. It exposes some directives making it easy to integrate azure-maps on an Angular application.

## Available directives

- azure-map
  - Displays an Azure map on the tag where the directive is applied
- compass-control
  - Adds a compass control on the map
- pitch-control
  - Adds a pitch control on the map
- style-control
  - Adds a style control on the map
- zoom-control
  - Adds a zoom control on the map

## How to register the module

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

## Use the directives

The following examples displays 4 maps, each having a different control attached.

```
<div azure-map [center]="[0, 0]" mapStyle='grayscale_dark' view='Auto' zoom="2" class="top-left">
  <div zoom-control position='top-left'></div>
</div>
<div azure-map [center]="[0, 0]" mapStyle='road' view='Auto' zoom="2" class="top-right">
  <div pitch-control position="top-right"></div>
</div>
<div azure-map [center]="[0, 0]" mapStyle='grayscale_light' view='Auto' zoom="2" class="bottom-left">
  <div compass-control position="bottom-left"></div>
</div>
<div azure-map [center]="[0, 0]" mapStyle='road_shaded_relief' view='Auto' zoom="2" class="bottom-right">
  <div style-control position="bottom-right"></div>
</div>
```

![4 Maps sample](../../assets/4mapssample.png)
