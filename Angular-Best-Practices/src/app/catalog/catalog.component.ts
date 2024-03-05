import { Component, OnInit } from '@angular/core';

import { IClass } from './class.model';

import { UserRepositoryService } from "../users/user-repository.service"
import { CatalogRepositoryService } from './catalog-repository.service';
import { FiltersClassService } from './filters-class.service';

@Component({
  styleUrls: ['./catalog.component.css'],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  classes: IClass[] = [];
  visibleClasses: IClass[] = [];

  constructor(private catalogRepository: CatalogRepositoryService,
     public userRepository: UserRepositoryService,
     private filterClasses: FiltersClassService) { }

  ngOnInit() {
    this.catalogRepository.getCatalog()
      .subscribe((classes: IClass[]) => { this.classes = classes; this.applyFilter('') });
  }

  enroll(classToEnroll: IClass) {
    classToEnroll.processing = true;
    this.userRepository.enroll(classToEnroll.classId)
      .subscribe({
        error: (err) => { console.error(err); classToEnroll.processing = false },
        complete: () => { classToEnroll.processing = false; classToEnroll.enrolled = true; },
      });
  }

  drop(classToDrop: IClass) {
    classToDrop.processing = true;
    this.userRepository.drop(classToDrop.classId)
      .subscribe({
        error: (err) => { console.error(err); classToDrop.processing = false },
        complete: () => { classToDrop.processing = false; classToDrop.enrolled = false; }
      });
  }

  applyFilter(filter: string) {
    this.visibleClasses = this.filterClasses.filterClasses(filter, this.classes);
  }

  
}
