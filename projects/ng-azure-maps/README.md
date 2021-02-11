![release](https://github.com/arnaudleclerc/ng-azure-maps/workflows/release/badge.svg?branch=main) [![NPM Version](https://img.shields.io/npm/v/ng-azure-maps.svg?style=flat)](https://www.npmjs.com/package/ng-azure-maps) [![NPM Downloads](https://img.shields.io/npm/dm/ng-azure-maps.svg?style=flat)](https://www.npmjs.com/package/ng-azure-maps) [![license](https://img.shields.io/npm/l/ng-azure-maps.svg?style=flat)](https://github.com/arnaudleclerc/ng-azure-maps/blob/develop/LICENSE)

# ng-azure-maps 

`ng-azure-maps` is a mostly HTML driven wrapper of the `azure-maps-controls` package allowing to easilly integrate its functionalities into an Angular application.

![4 Maps sample](https://raw.githubusercontent.com/arnaudleclerc/ng-azure-maps/master/assets/4mapssample.png)

## Install the package

The package is available on npm. You need to install the dependencies to the azure-maps-* packages by yourself.

```
npm i --save azure-maps-control azure-maps-drawing-tools azure-maps-rest ng-azure-maps
```

## Usage

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

## How To

Please refer to the [Wiki](https://github.com/arnaudleclerc/ng-azure-maps/wiki) for more details.
