import { Component } from '@angular/core';
import { IMapEvent } from 'ng-azure-maps';

@Component({
  selector: 'app-root',
  template: '<azure-map (onClick)="clickedMap($event)">' +
    '<map-popup [content]="content" [position]="popupPosition" [opened]="opened" (onClose)="closed()"></map-popup>' +
    '<map-html-marker [position]="fixedPosition" (onMouseOver)="enterMarker()" (onMouseLeave)="leaveMarker()"></map-html-marker>' +
    '<map-popup [content]="fixedPopupContent" [position]="fixedPosition" [closeButton]="false" [pixelOffset]="[0,-36]" ' +
    '[fillColor]="\'rgba(0,0,0,0.8)\'" [opened]="fixedPopupOpened"></map-popup>' +
    '</azure-map>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private popupTemplate = '<div class="infobox"><b>Coordinates</b><br>Longitude: {longitude}<br>Latitude: {latitude}</div>';

  public content: string;
  public popupPosition: [number, number];
  public opened: boolean;

  public fixedPosition: [number, number] = [0, 50];
  public fixedPopupContent: string = '<span class="infobox-2">Shows on mouse over<span>';
  public fixedPopupOpened: boolean;

  enterMarker(): void {
    this.fixedPopupOpened = true;
  }

  leaveMarker(): void {
    this.fixedPopupOpened = false;
  }

  clickedMap(clickEvent: IMapEvent): void {
    this.popupPosition = clickEvent.event.position;
    this.popupPosition[0].toFixed(3)
    this.content = this.popupTemplate.replace(/{longitude}/g, this.popupPosition[0].toFixed(3)).replace(/{latitude}/g, this.popupPosition[1].toFixed(3))
    this.opened = true;
  }

  closed(): void {
    this.opened = false;
  }
}
