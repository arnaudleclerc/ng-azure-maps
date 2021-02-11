import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HtmlMarkerOptions } from 'azure-maps-control';
import { DrawingToolbarDirective } from './drawing-toolbar.directive';
import * as atlasdrawing from 'azure-maps-drawing-tools';

describe('map-drawing-toolbar', () => {
  @Component({
    template: '<map-drawing-toolbar [dragHandleStyle]="dragHandleStyle" '
      + '[freehandInterval]="freehandInterval" '
      + '[interactionType]="interactionType" '
      + '[mode]="mode" '
      + '[secondaryDragHandleStyle]="secondaryDragHandleStyle" '
      + '[shapeDraggingEnabled]="shapeDraggingEnabled" '
      + '[buttons]="buttons" '
      + '[containerId]="containerId" '
      + '[numColumns]="numColumns" '
      + '[position]="position" '
      + '[toolbarStyle]="toolbarStyle" '
      + '[visible]="visible" '
      + '></map-drawing-toolbar>'
  })
  class TestComponent {

    @Input() public dragHandleStyle: HtmlMarkerOptions;
    @Input() public freehandInterval: number;
    @Input() public interactionType: atlasdrawing.drawing.DrawingInteractionType;
    @Input() public mode: atlasdrawing.drawing.DrawingMode;
    @Input() public secondaryDragHandleStyle: HtmlMarkerOptions;
    @Input() public shapeDraggingEnabled: boolean;

    @Input() public buttons: string[];
    @Input() public containerId: string;
    @Input() public numColumns: number;
    @Input() public position: string;
    @Input() public toolbarStyle: string;
    @Input() public visible: boolean;

    @ViewChild(DrawingToolbarDirective)
    directive: DrawingToolbarDirective;
  }

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, DrawingToolbarDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should be created with dragHandleStyle', () => {
    fixture.componentInstance.dragHandleStyle = {};
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.dragHandleStyle).toEqual(fixture.componentInstance.dragHandleStyle);
  });

  it('should be created with freehandInterval', () => {
    fixture.componentInstance.freehandInterval = 1;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.freehandInterval).toEqual(fixture.componentInstance.freehandInterval);
  });

  it('should be created with interactionType', () => {
    fixture.componentInstance.interactionType = atlasdrawing.drawing.DrawingInteractionType.click;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.interactionType).toEqual(fixture.componentInstance.interactionType);
  });

  it('should be created with mode', () => {
    fixture.componentInstance.mode = atlasdrawing.drawing.DrawingMode.drawCircle;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.mode).toEqual(fixture.componentInstance.mode);
  });

  it('should be created with secondaryDragHandleStyle', () => {
    fixture.componentInstance.secondaryDragHandleStyle = {};
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.secondaryDragHandleStyle).toEqual(fixture.componentInstance.secondaryDragHandleStyle);
  });

  it('should be created with shapeDraggingEnabled', () => {
    fixture.componentInstance.shapeDraggingEnabled = true;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.shapeDraggingEnabled).toEqual(fixture.componentInstance.shapeDraggingEnabled);
  });

  it('should be created with buttons', () => {
    fixture.componentInstance.buttons = ['buttons'];
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.buttons).toEqual(fixture.componentInstance.buttons);
  });

  it('should be created with containerid', () => {
    fixture.componentInstance.containerId = 'containerid';
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.containerId).toEqual(fixture.componentInstance.containerId);
  });

  it('should be created with numColumns', () => {
    fixture.componentInstance.numColumns = 2;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.numColumns).toEqual(fixture.componentInstance.numColumns);
  });

  it('should be created with position', () => {
    fixture.componentInstance.position = 'position';
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.position).toEqual(fixture.componentInstance.position);
  });

  it('should be created with toolbarStyle', () => {
    fixture.componentInstance.toolbarStyle = 'toolbarStyle';
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.toolbarStyle).toEqual(fixture.componentInstance.toolbarStyle);
  });

  it('should be created with visible', () => {
    fixture.componentInstance.visible = true;
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.visible).toEqual(fixture.componentInstance.visible);
  });

  it('should update toolbar ooptions on changes', () => {
    const directive = fixture.componentInstance.directive as any;
    directive._toolbar = {
      setOptions: () => { }
    };
    const spyToolbarSetOptions = spyOn(directive._toolbar, 'setOptions').and.callThrough();
    fixture.componentInstance.buttons = ['buttons'];
    fixture.componentInstance.containerId = 'containerId';
    fixture.componentInstance.numColumns = 2;
    fixture.componentInstance.position = 'position';
    fixture.componentInstance.toolbarStyle = 'toolbarStyle';
    fixture.componentInstance.visible = true;
    fixture.detectChanges();
    expect(spyToolbarSetOptions).toHaveBeenCalledWith({
      buttons: fixture.componentInstance.directive.buttons,
      containerId: fixture.componentInstance.directive.containerId,
      numColumns: fixture.componentInstance.directive.numColumns,
      position: fixture.componentInstance.directive.position,
      style: fixture.componentInstance.directive.toolbarStyle,
      visible: fixture.componentInstance.directive.visible
    });
  });
});
