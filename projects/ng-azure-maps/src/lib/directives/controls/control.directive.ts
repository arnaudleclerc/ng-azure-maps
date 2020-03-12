import { Input } from '@angular/core';
import { ControlPosition, Map } from 'azure-maps-control';

export abstract class ControlDirective {

  @Input() public position: ControlPosition;

  public abstract initialize(map: Map): void;

}
