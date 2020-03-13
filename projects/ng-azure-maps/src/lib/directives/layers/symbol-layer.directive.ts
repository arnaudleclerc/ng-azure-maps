import { Directive, Input, OnChanges, SimpleChanges, OnDestroy, Output } from '@angular/core';
import { Map, Expression, IconOptions, TextOptions } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';
import { Subject } from 'rxjs';

@Directive({
  selector: '[symbol-layer], symbol-layer'
})
export class SymbolLayerDirective
  implements OnChanges, OnDestroy {

  private _layer: atlas.layer.SymbolLayer;

  @Input() public id: string;
  @Input() public dataSourceId: string;

  @Input() public filter: Expression;
  @Input() public iconOptions: IconOptions;
  @Input() public lineSpacing: Expression | number;
  @Input() public maxZoom: number;
  @Input() public minZoom: number;
  @Input() public placement: "point" | "line" | "line-center";
  @Input() public textOptions: TextOptions;
  @Input() public visible: boolean;

  public get hasLayer(): boolean {
    return !!this._layer;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._layer) {
      this._layer.setOptions({
        filter: this.filter,
        iconOptions: this.iconOptions,
        lineSpacing: this.lineSpacing,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        placement: this.placement,
        textOptions: this.textOptions,
        visible: this.visible
      });
    }
  }

  ngOnDestroy() {
    this._layer.getMap().layers.remove(this._layer);
  }

  public initialize(map: Map, dataSource: atlas.source.DataSource): void {
    this._layer = new atlas.layer.SymbolLayer(dataSource, this.id, {
      filter: this.filter,
      iconOptions: this.iconOptions,
      lineSpacing: this.lineSpacing,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      placement: this.placement,
      textOptions: this.textOptions,
      visible: this.visible
    });

    map.layers.add(this._layer);
  }

}
