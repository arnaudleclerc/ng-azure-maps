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
