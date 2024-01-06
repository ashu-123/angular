import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lf-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrl: './user-settings-form.component.css'
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: "",
    emailOffers: true,
    interfaceStyle: 'Light',
    subscriptionType: 'Annual',
    notes: 'blank notes'

  };

  postError = false;
  postErrorMessage = '';
  singleModel: string = "On";
  startDate = new Date();
  subscriptionTypes!: Observable<string[]>;
  userSettings: UserSettings = { ...this.originalUserSettings };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onSubmit(form: NgForm): void {
    console.log(form.submitted + ': ' + JSON.stringify(form.value));
    if(form.valid) {
    this.dataService.postUserSettings(this.userSettings).subscribe(
      result => console.log('success ' + JSON.stringify(result)),
      err => this.onError(err)
    );
    }
    else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
  }

  onError(errorResponse: any): void {
    console.log(JSON.stringify(errorResponse));
    this.postError = true;
    this.postErrorMessage = errorResponse.error;
  }

  onBlur(field: NgModel) {
    console.log('in on blur: ' + field.valid);
  }
}
