import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainPagesComponent } from './user-main-pages.component';

describe('UserMainPagesComponent', () => {
  let component: UserMainPagesComponent;
  let fixture: ComponentFixture<UserMainPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMainPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMainPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
