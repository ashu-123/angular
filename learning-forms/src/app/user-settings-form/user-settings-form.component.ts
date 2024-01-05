import { Component } from '@angular/core';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'lf-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrl: './user-settings-form.component.css'
})
export class UserSettingsFormComponent {

  originalUserSettings: UserSettings = {
    name: 'Ashutosh',
    emailOffers: true,
    interfaceStyle: 'Light',
    subscriptionType: 'Annual',
    notes: 'blank notes'

  };

  userSettings: UserSettings = { ...this.originalUserSettings };
}
