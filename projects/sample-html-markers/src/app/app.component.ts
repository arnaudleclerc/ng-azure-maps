import { Component } from '@angular/core';
import { IMarkerEvent } from 'ng-azure-maps';
import * as atlas from 'azure-maps-control';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
    selector: 'app-root',
    template: '<azure-map (onReady)="mapReady()">' +
        '<map-html-marker *ngFor="let peopleMarker of peopleMarkers | async" [marker]="peopleMarker" (onMouseUp)="openPopup($event)">' +
        '</map-html-marker>' +
        '</azure-map>',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  public markerPositions: [number, number][] = [];
  public peopleMarkers: Observable<atlas.HtmlMarker[]>;

  mapReady() {
    for (let i = 0; i < 10; i++) {
      this.markerPositions.push([i * 5, i * 5]);
    }

    this.peopleMarkers = of(this.markerPositions.map(position => {
      const marker = new CustomMarker({
        position,
        popup: new atlas.Popup({
          content: `<div style="padding: 10px;">Test Popup</div>`,
        }),
      });
      marker.customerProperty = "myCustomValue";
      return marker;
    }))
  }

  public openPopup(event: IMarkerEvent): void {
    console.log((<CustomMarker>event.marker).customerProperty)
    event.marker.togglePopup();
  }
}

class CustomMarker extends atlas.HtmlMarker {

  public customerProperty: string;

  constructor(options: atlas.HtmlMarkerOptions) {
    super(options);
  }
}
