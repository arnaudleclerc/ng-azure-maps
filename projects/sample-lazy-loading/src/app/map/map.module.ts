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
