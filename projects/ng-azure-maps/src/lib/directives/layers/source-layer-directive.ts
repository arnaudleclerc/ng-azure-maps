import * as atlas from 'azure-maps-control';
import { OnDestroy, Input, Directive } from '@angular/core';
import { LayerDirective } from './layer-directive';

@Directive()
export abstract class SourceLayerDirective<T extends atlas.layer.Layer>
  extends LayerDirective<T>
  implements OnDestroy {

  @Input() public dataSourceId: string;
  @Input() public sourceLayer: string;

  public initialize(map: atlas.Map, dataSource: atlas.source.Source): void {
    this.layer = this.buildLayer(dataSource);

    this.initializeEvents(map);

    map.layers.add(this.layer, this.before);
  };

  public clear(map: atlas.Map) {
    map.layers.remove(this.layer);
    this.layer = null;
  }

  protected abstract buildLayer(dataSource: atlas.source.Source): T;

}
