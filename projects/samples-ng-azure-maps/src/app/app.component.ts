import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
  implements OnInit {

  public markerPosition: [number, number] = [0, 0];

  ngOnInit(): void {
    let i = 0;
    setInterval(() => {
      if (this.markerPosition) {
        const newMarker: [number, number] = [this.markerPosition[0] + 5, this.markerPosition[1] + 5];
        this.markerPosition = newMarker;
        i++;
        if (i === 10) {
          this.markerPosition = null;
        }
      }
    }, 1000);
  }

}
