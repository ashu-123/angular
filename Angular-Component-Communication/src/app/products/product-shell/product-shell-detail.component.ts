import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription, timer } from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  // Need to handle null to allow for no selected product.
  errorMessage = '';

  product: IProduct | null = null;

  sub!: Subscription;

  // get prod(): IProduct | null {
  //   return this.productService.currentProduct;
  // }

    constructor(private productService: ProductService) { }

    ngOnInit() {

      // timer(0, 1000).subscribe(data => console.log(this.prod));
      this.sub = this.productService.selectedProductChanges$.subscribe(
        selectedProduct => this.product = selectedProduct
      );
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

}
