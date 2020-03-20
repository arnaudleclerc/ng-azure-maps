import { Component } from '@angular/core';
import { IMarkerEvent } from 'ng-azure-maps';

@Component({
  selector: 'app-root',
  template: '<azure-map (onReady)="mapReady()">' +
    '<html-marker *ngFor="let markerPosition of markerPositions" [position]="markerPosition" [draggable]="true" (onDrag)="reverseMove($event)">' +
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

  public reverseMove(markerEvent: IMarkerEvent) {
    markerEvent.marker.setOptions({
      position: [-markerEvent.event.target.options.position[0],-markerEvent.event.target.options.position[1]]
    });
  }
}
