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
