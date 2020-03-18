import * as atlas from 'azure-maps-control';

export interface IMapEvent {
  map: atlas.Map;
  event: any;
}
