import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavBarComponent } from './nav-bar.component';
import { RouterLinkWithHref } from '@angular/router';
//necessary for testing router outlet
import { RouterTestingModule } from '@angular/router/testing';


//https://angular.io/guide/testing#component-with-a-dependency
//here we don't need the full service just some test values
//this means we don't have to worry about importing httpmodule, or authttp or other service dependencies
//additionally, we can only worry about the relevant fields
import { UserService } from '../../services/user-service'
let userServiceStub: Partial<UserService> =
{
    isUserLoggedIn: () => {return true},
    logOut: function () {return false},
};

//when logged in
describe('NavBarComponent:LoggedIn', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      providers: [ {provide: UserService, useValue: userServiceStub } ],
      imports: [RouterTestingModule.withRoutes([])]
    })

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    //you have to specifically call change detection when you update values for testing
    fixture.detectChanges();

    //if importing actual service
    //let service = Testbed.get( MyService )
    //change implementation - so there is no http call
    //spyOn( service, 'getTodos' ).andreturnValue( Observable.from( [1,2,3] ) )
    //expect -- check that the data displays
  });

    //test to make sure clicking menu button opens nav menu dropdown
    it('should open dropdown when button clicked', () => {
      let menuButton = fixture.debugElement.query(By.css('.navbar-toggler'));
      menuButton.triggerEventHandler( 'click', null );
      expect( component.navBarOpen ).toBe( true );
    })

    it( 'should have a link to the user details page, when logged in', () => {
      let debugElements = fixture.debugElement.queryAll( By.directive(RouterLinkWithHref) );
      let index = debugElements.findIndex( de => de.properties['href'] === '/user-details' );
      expect( index ).toBeGreaterThan( -1 );
    })

    it( 'should have a link to the home page', () => {
      let debugElements = fixture.debugElement.queryAll( By.directive(RouterLinkWithHref) );
      let index = debugElements.findIndex( de => de.properties['href'] === '/' );
      expect( index ).toBeGreaterThan( -1 );
    })

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});


let userServiceStubLoggedOut: Partial<UserService> =
{
    isUserLoggedIn: () => {return false},
    logOut: function () {return false},
};

//when logged out
describe('NavBarComponent:LoggedOut', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      providers: [ {provide: UserService, useValue: userServiceStubLoggedOut } ],
      imports: [RouterTestingModule.withRoutes([])]
    })

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it( 'should have a link to the login page, when logged out', () => {
    let debugElements = fixture.debugElement.queryAll( By.directive(RouterLinkWithHref) );
    let index = debugElements.findIndex( de => de.properties['href'] === '/login' );
    expect( index ).toBeGreaterThan( -1 );
    })

});
