import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product, ProductResolved } from './product';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved>{

  constructor(private productService: ProductService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductResolved | Observable<ProductResolved> | Promise<ProductResolved> {
    const id = Number(route.paramMap.get('id'));
    return this.productService.getProduct(id)
      .pipe(map(product => ({ product: product })),
        catchError(err => {
          const message = `Retrieval error: ${err}`;
          console.error(message);
          return of({ product: null, error: message });
        }));
  }
}
