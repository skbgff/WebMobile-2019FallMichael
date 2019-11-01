import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomMainPageComponent } from './user-custom-main-page.component';

describe('UserCustomMainPageComponent', () => {
  let component: UserCustomMainPageComponent;
  let fixture: ComponentFixture<UserCustomMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
