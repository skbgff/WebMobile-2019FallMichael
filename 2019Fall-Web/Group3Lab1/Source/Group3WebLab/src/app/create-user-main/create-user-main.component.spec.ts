import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserMainComponent } from './create-user-main.component';

describe('CreateUserMainComponent', () => {
  let component: CreateUserMainComponent;
  let fixture: ComponentFixture<CreateUserMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
