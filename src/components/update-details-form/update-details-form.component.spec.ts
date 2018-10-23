import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailsFormComponent } from './update-details-form.component';

describe('UpdateDetailsFormComponent', () => {
  let component: UpdateDetailsFormComponent;
  let fixture: ComponentFixture<UpdateDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
