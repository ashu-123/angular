import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';
import { EMPTY, catchError, combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  errorMessage = '';

  product$ = this.productService.selectedProduct$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  pageTitle$ = this.productService.selectedProduct$
  .pipe(
    map(p => p ? `Product name :- ${p.productName}` : 'Product Detail')
  )

  productSuppliers$ = this.productService.selectedProductSuppliers$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    vm$ = combineLatest([
      this.product$,
      this.productSuppliers$,
      this.pageTitle$
    ]).pipe(
      filter(([product]) => Boolean(product)),
      map(([product, productSuppliers, pageTitle]) => ({
        product, productSuppliers, pageTitle
      }))
    )

  constructor(private productService: ProductService) { }

}
