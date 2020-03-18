import * as atlas from 'azure-maps-control';

export interface ILayerEvent {
  layer: atlas.layer.Layer | atlas.layer.Layer[];
  event: any;
}
