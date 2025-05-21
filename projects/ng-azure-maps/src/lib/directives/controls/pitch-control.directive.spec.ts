import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlPosition } from 'azure-maps-control';
import { PitchControlDirective } from './pitch-control.directive';

describe('map-pitch-control', () => {

  @Component({
    template: '<map-pitch-control [position]="mapCompassControlPosition"></map-pitch-control>',
    standalone: false
})
  class TestComponent {

    @Input()
    mapCompassControlPosition: ControlPosition;

    @ViewChild(PitchControlDirective)
    directive: PitchControlDirective;
  }

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, PitchControlDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
    expect(fixture.componentInstance.directive.position).toBeUndefined();
  });

  it('should be created with top-left position', () => {
    fixture.componentInstance.mapCompassControlPosition = ControlPosition.TopLeft;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.position).toEqual(ControlPosition.TopLeft);
  });

  it('should be created with top-right position', () => {
    fixture.componentInstance.mapCompassControlPosition = ControlPosition.TopRight;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.position).toEqual(ControlPosition.TopRight);
  });

  it('should be created with bottom-left position', () => {
    fixture.componentInstance.mapCompassControlPosition = ControlPosition.BottomLeft;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.position).toEqual(ControlPosition.BottomLeft);
  });

  it('should be created with bottom-right position', () => {
    fixture.componentInstance.mapCompassControlPosition = ControlPosition.BottomRight;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.position).toEqual(ControlPosition.BottomRight);
  });

  it('should be created with non-fixed position', () => {
    fixture.componentInstance.mapCompassControlPosition = ControlPosition.NonFixed;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.position).toEqual(ControlPosition.NonFixed);
  });

  it('should be initialized', () => {
    const map: any = {
      controls: {
        add: () => { }
      }
    };

    const spyControlsAdd = spyOn(map.controls, 'add');
    fixture.componentInstance.mapCompassControlPosition = ControlPosition.NonFixed;
    fixture.detectChanges();
    fixture.componentInstance.directive.initialize(map);
    expect(spyControlsAdd).toHaveBeenCalledOnceWith(jasmine.anything(), {
      position: fixture.componentInstance.directive.position
    });
  });

});
