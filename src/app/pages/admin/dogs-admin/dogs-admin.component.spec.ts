import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsAdminComponent } from './dogs-admin.component';

describe('DogsAdminComponent', () => {
  let component: DogsAdminComponent;
  let fixture: ComponentFixture<DogsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
