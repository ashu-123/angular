import { Component, OnDestroy, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  products: IProduct[] = [];
  errorMessage = '';
  sub1!: Subscription;
  sub2!: Subscription;

  selectedProduct: IProduct | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub1 = this.productService.selectedProductChanges$.subscribe(product => this.selectedProduct = product);
    this.sub2 = this.productService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product);

  }

}
