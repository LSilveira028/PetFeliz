import { TestBed } from '@angular/core/testing';

import { ServicoDogwalkerService } from './servico-dogwalker.service';

describe('ServicoDogwalkerService', () => {
  let service: ServicoDogwalkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoDogwalkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
