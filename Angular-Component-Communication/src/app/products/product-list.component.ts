import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product List';

  includeFilter = true;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  @ViewChild(CriteriaComponent) filterComponent!: CriteriaComponent
  parentListFilter!: string;

  // @ViewChildren('filterElementRef, selectElement')
  //  selectedElements!: QueryList<ElementRef>;

  // get listFilter(): string {
  //   return this._listFilter;
  // }

  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.performFilter(this.listFilter);
  // }

  constructor(private productService: ProductService, private productParameterService: ProductParameterService) { }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
        // this.performFilter(this.parentListFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }

  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  // onFilterChange(filter: string) {
  //   this.listFilter = filter;
  //   this.performFilter(filter);
  // }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.productParameterService.filterBy = filterBy;
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
