import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CatalogRepositoryService } from './catalog-repository.service';



@NgModule({
  declarations: [ CatalogComponent ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [ ],
  providers: [ CatalogRepositoryService ]
})
export class CatalogModule { }
