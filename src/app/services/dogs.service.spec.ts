import { TestBed } from '@angular/core/testing';

import { DogsService } from './dogs.service';

describe('DogsServiceService', () => {
  let service: DogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
