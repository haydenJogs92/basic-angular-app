import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { UserService } from '../../services/user-service'
let userServiceStub: Partial<UserService>;
//define the part of the service we need
userServiceStub =
{
    isUserLoggedIn: () => {return true},
    logOut: function () {return false},
}

//create router stub to check that navigation interaction occurs
import { Router } from '@angular/router';
class RouterStub
{
  navigate( params )
  {

  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: UserService, useValue: userServiceStub },
        {provide: Router, useClass: RouterStub },
        ]
    })

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open navigate user to my account page', () => {
    let router = TestBed.get(Router);
    let spy = spyOn( router, 'navigate' );
    component.navigateToMyAccount();
    expect( spy ).toHaveBeenCalledWith(['/user-details']);
  })


  it('should open navigate user to login page', () => {
    let router = TestBed.get(Router);
    let spy = spyOn( router, 'navigate' );
    component.navigateToLogin();
    expect( spy ).toHaveBeenCalledWith(['/login']);
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
