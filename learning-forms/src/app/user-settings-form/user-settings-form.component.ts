import { Component } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm } from '@angular/forms';

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

  onSubmit(form: NgForm): void {
    console.log(form.submitted + ': ' + form.valid);
  }
}
