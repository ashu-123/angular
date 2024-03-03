import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() { }

  private _listFilter!: string;

  hitMessage!: string;

  @Input() displayFilter: boolean = false;

  @Input()
  hitCount:number = 0;

  @Output() valuChange = new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef!: ElementRef;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.valuChange.emit(this._listFilter);
  }

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
