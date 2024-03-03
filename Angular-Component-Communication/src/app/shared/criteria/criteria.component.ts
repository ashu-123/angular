import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() { }

  listFilter: string = 'cart';

  hitMessage!: string;

  @Input() displayFilter: boolean = false;

  @Input()
  hitCount:number = 0;

  @ViewChild('filterElement') filterElementRef!: ElementRef;

  @ViewChild(NgModel) inputElement!: NgModel;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.filterElementRef) this.filterElementRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    }
    else {
      this.hitMessage = 'Hits: ' + this.hitCount 
    }
  }

}
