import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsAdminComponent } from './cats-admin.component';

describe('CatsAdminComponent', () => {
  let component: CatsAdminComponent;
  let fixture: ComponentFixture<CatsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
