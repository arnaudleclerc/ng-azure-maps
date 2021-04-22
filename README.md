![release](https://github.com/arnaudleclerc/ng-azure-maps/workflows/release/badge.svg?branch=main) [![NPM Version](https://img.shields.io/npm/v/ng-azure-maps.svg?style=flat)](https://www.npmjs.com/package/ng-azure-maps) [![NPM Downloads](https://img.shields.io/npm/dm/ng-azure-maps.svg?style=flat)](https://www.npmjs.com/package/ng-azure-maps) [![license](https://img.shields.io/npm/l/ng-azure-maps.svg?style=flat)](https://github.com/arnaudleclerc/ng-azure-maps/blob/develop/LICENSE)

# ng-azure-maps 

`ng-azure-maps` is an Angular library, mostly HTML driven wrapper of the `azure-maps-controls` package allowing to easilly integrate its functionalities into an Angular application.

![4 Maps sample](./assets/4mapssample.png)

## Install the package

The package is available on npm. You need to install the dependencies to the azure-maps-* packages by yourself.

```
npm i --save azure-maps-control azure-maps-drawing-tools azure-maps-rest ng-azure-maps
```

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

The module can also be lazy loaded using the `forChild` method. 

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AzureMapsModule } from 'ng-azure-maps';
import { environment } from '../../environments/environment';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: "", component: MapComponent }];

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AzureMapsModule.forChild({
      authOptions: environment.authOptions
    })
  ]
})
export class MapModule { }
```

If you need to dynamically set the azure maps configuration, you can override the `AZUREMAPS_CONFIGURATION` injection token as follows : 

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AzureMapsModule, AZUREMAPS_CONFIG } from 'ng-azure-maps';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AzureMapsModule.forRoot()
  ],
  providers: [
    {
      provide: AZUREMAPS_CONFIG,
      useValue: {
        authOptions: environment.authOptions
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You can also use an APP_INITIALIZER to set the configuration if you need to retrieve the configuration asynchronously : 

```
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AzureMapsModule, setAzureMapsConfiguration } from 'ng-azure-maps';
import { HttpClient } from '@angular/common/http';
import { AuthenticationType } from 'azure-maps-control';

function setAuthentication(httpClient: HttpClient): () => Promise<void> {
  return (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      httpClient.get<{ subscriptionKey: string }>('<your-api-endpoint>').subscribe(auth => {
        setAzureMapsConfiguration({
          authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: auth.subscriptionKey
          }
        });
        resolve();
      }, error => {
        reject(error);
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AzureMapsModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setAuthentication,
      deps: [HttpClient],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## How To

Please refer to the [Wiki](https://github.com/arnaudleclerc/ng-azure-maps/wiki) for more details.
