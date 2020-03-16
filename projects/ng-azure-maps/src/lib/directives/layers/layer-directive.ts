import * as atlas from 'azure-maps-control';
import { Map } from 'azure-maps-control';
import { OnDestroy, Input } from '@angular/core';

export abstract class LayerDirective<T extends atlas.layer.Layer>
  implements OnDestroy {

  protected layer: T;

  @Input() public id: string;
  @Input() public dataSourceId: string;

  public get hasLayer(): boolean {
    return !!this.layer;
  }

  ngOnDestroy(): void {
    this.layer.getMap().layers.remove(this.layer);
  }

  public initialize(map: Map, dataSource: atlas.source.DataSource): void {
    this.layer = this.buildLayer(dataSource);
    map.layers.add(this.layer);
  };

  protected abstract buildLayer(dataSource: atlas.source.DataSource): T;

}
