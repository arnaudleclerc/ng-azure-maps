import * as atlas from 'azure-maps-control';
import { Map } from 'azure-maps-control';
import { OnDestroy, Input } from '@angular/core';
import { LayerDirective } from './layer-directive';

export abstract class SourceLayerDirective<T extends atlas.layer.Layer>
  extends LayerDirective<T>
  implements OnDestroy {

  @Input() public dataSourceId: string;

  public initialize(map: Map, dataSource: atlas.source.DataSource): void {
    this.layer = this.buildLayer(dataSource);
    map.layers.add(this.layer);
  };

  public clear(map: Map) {
    map.layers.remove(this.layer);
    this.layer = null;
  }

  protected abstract buildLayer(dataSource: atlas.source.DataSource): T;

}
