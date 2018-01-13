import { TestBed, inject } from '@angular/core/testing';

import { ShoppingBasketService } from './shopping-basket.service';

describe('ShoppingBasketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingBasketService]
    });
  });

  it('should be created', inject([ShoppingBasketService], (service: ShoppingBasketService) => {
    expect(service).toBeTruthy();
  }));
});
