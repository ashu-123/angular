import { Injectable } from '@angular/core';
import { IClass } from './class.model';

@Injectable()
export class FiltersClassService {

  constructor() { }

  filterClasses(filter: string, classes: IClass[]): IClass[] {
    if (!filter) {
      return classes;
    }

    if (filter === 'GEN') {
      return this.getGeneralCourses(classes);
    } else {
      return classes.filter(c => c.course.courseNumber.startsWith(filter));
    }
  }

  getGeneralCourses(classes: IClass[]) {
    return classes.filter(c =>
      !c.course.courseNumber.startsWith('CH') &&
      !c.course.courseNumber.startsWith('PO') &&
      !c.course.courseNumber.startsWith('SP'));
  }

}
