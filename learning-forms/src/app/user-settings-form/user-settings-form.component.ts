import { Component } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';

@Component({
  selector: 'lf-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrl: './user-settings-form.component.css'
})
export class UserSettingsFormComponent {

  originalUserSettings: UserSettings = {
    name: "",
    emailOffers: true,
    interfaceStyle: 'Light',
    subscriptionType: 'Annual',
    notes: 'blank notes'

  };

  userSettings: UserSettings = { ...this.originalUserSettings };

  constructor(private dataService: DataService) { }

  onSubmit(form: NgForm): void {
    console.log(form.submitted + ': ' + form.valid);
    this.dataService.postUserSettings(this.userSettings).subscribe(
      result => console.log('success ' + JSON.stringify(result)),
      err => console.error('error ' + err)
    );
  }

  onBlur(field: NgModel) {
    console.log('in on blur: ' + field.valid);
  }
}
