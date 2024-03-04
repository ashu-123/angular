import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { timer } from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  // Need to handle null to allow for no selected product.
  errorMessage = '';

  product: IProduct | null = null;

  // get prod(): IProduct | null {
  //   return this.productService.currentProduct;
  // }

    constructor(private productService: ProductService) { }

    ngOnInit() {

      // timer(0, 1000).subscribe(data => console.log(this.prod));
      this.productService.selectedProductChanges$.subscribe(
        selectedProduct => this.product = selectedProduct
      );
    }

}
