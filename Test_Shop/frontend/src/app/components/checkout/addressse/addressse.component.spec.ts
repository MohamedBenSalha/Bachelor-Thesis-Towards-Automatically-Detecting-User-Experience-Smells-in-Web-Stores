import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressseComponent} from './addressse.component';

describe('AddressseComponent', () => {
  let component: AddressseComponent;
  let fixture: ComponentFixture<AddressseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
