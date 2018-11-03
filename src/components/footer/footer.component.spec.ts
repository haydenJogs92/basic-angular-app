import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;


  /*
  //configure the testing module
  //this is because the template is in a seperate, external file, so we have have to tell angular to compile the component with template and stylesheets
  //this method is asynchronous because it takes a bit for the compiler to access the file system to get the external html & css files for compilation
  //however, when using webpack, this seperate compileComponents method is unnecessary, because webpack inlines everything in the bundle ( no need to access file system )
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  //once component is compiled, create the component instance to test
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  */

  //simpler implementation - does the same thing
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
