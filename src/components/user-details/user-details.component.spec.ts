import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../../services/user-service'




describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  //import a fake version of our service,
  //it is safer than actually accessing real api endpoints,
  //ex: logging in a user, making a purchase
  //that or use spyOn and callFake 
  let userServiceStub: Partial<UserService>;

  //needs complete method with services etc
  userServiceStub = {
    testEmail: 'test@test.com',
    testPassword:  'test'
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers:    [ {provide: UserService, useValue: userServiceStub } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
