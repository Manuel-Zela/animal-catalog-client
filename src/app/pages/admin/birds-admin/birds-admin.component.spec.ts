import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdsAdminComponent } from './birds-admin.component';

describe('BirdsAdminComponent', () => {
  let component: BirdsAdminComponent;
  let fixture: ComponentFixture<BirdsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirdsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirdsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
