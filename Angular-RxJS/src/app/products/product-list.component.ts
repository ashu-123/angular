import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, map, startWith } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css',],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';

  categories$ = this.productCategoryService.productCategories$;

  private categorySelectedSubject = new Subject<number>();
  // private categoryBehaviorSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable().pipe(startWith(0));

  errorSubject = new Subject<string>();
  errorMsg$ = this.errorSubject.asObservable();

  products$ = combineLatest([this.productService.productsWithCategory$, this.categorySelectedAction$])
   .pipe(

    map(([products, selectedCategoryId]) => products.filter(product => selectedCategoryId ? selectedCategoryId === product.categoryId : true)),
      catchError(err => {this.errorSubject.next(err); return EMPTY; })
   )


  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
