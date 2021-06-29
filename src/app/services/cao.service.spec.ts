import { TestBed } from '@angular/core/testing';

import { CaoService } from './cao.service';

describe('CaoService', () => {
  let service: CaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
