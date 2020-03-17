import * as atlas from 'azure-maps-control';
import { OnDestroy, Input } from '@angular/core';

export abstract class LayerDirective<T extends atlas.layer.Layer>
  implements OnDestroy {

  protected layer: T;

  @Input() public id: string;

  public get hasLayer(): boolean {
    return !!this.layer;
  }

  ngOnDestroy(): void {
    this.layer.getMap().layers.remove(this.layer);
  }

}
