import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';


/*
this spec file looks at the App Component in isolation, so it doesn't know anything about
the other components imported in the app module.

So because this component references router-outlet, nav-bar, and nav-footer, the spec file doesn't know anything about these

One option is to create stub components that are place holders. Another is to suppress the error by telling the test runner
that we use custom elements. however, now our compiler won't check for included
*/
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas:[ CUSTOM_ELEMENTS_SCHEMA ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () =>
  {
    //you can also get fixture.nativeElement, or fixture.debugElement
    expect(component).toBeTruthy();
  });

  it('should have a router outlet', () => {
    let de = fixture.debugElement.query( By.directive(RouterOutlet) );
    expect( de ).not.toBeNull();
  });


});
