import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../product.service';
import { EMPTY, Subject, catchError } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class ProductListAltComponent {
  pageTitle = 'Products';

  errorSubject = new Subject<string>();
  errorMsg$ = this.errorSubject.asObservable();

  products$ = this.productService.productsWithCategory$
  .pipe(
    catchError(err => {this.errorSubject.next(err); return EMPTY; })
  );

  selectedProduct$ = this.productService.selectedProduct$
  .pipe(
    catchError(err => {this.errorSubject.next(err); return EMPTY; })
  );

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
    console.log('Not yet implemented');
  }
}
