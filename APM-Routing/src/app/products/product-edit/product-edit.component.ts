import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string | undefined = '';

  // product: Product | null = null;

  private currentProduct: Product | null = null;
  private originalProduct: Product | null = null;

  private dataIsValid: { [key: string]: boolean } = {};

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  get product(): Product | null {
    return this.currentProduct;
  }

  set product(value: Product | null) {
    this.currentProduct = value;
    if(value)
    this.originalProduct = { ...value};
  }
    
  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        const productResolved = data['resolvedData'];
        this.errorMessage = productResolved.error;
        this.onProductRetrieved(productResolved.product as Product)
      }
    );
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  get isDirty(): boolean {
    return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (!this.product || !this.product.id) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product?.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product?.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
    this.router.navigateByUrl('/products');
  }

  saveProduct(): void {
    if (this.product) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product?.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product?.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();
    // Navigate back to the product list
    this.router.navigateByUrl('/products');
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  validate(): void {
    this.dataIsValid = {};

    //info tab
    if (this.product?.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode) {
      this.dataIsValid['info'] = true;
    }
    else {
      this.dataIsValid['info'] = false;
    }

    //tags tab
    if (this.product?.category &&
      this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    }
    else {
      this.dataIsValid['tags'] = false;
    }
  }

  reset(): void {
    this.originalProduct = this.currentProduct;
    this.dataIsValid = { };
  }
}
