import { Component } from '@angular/core';
import { profileIconNames } from './profile-icon.names';

@Component({
  selector: 'con-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css']
})
export class ProfileIconSelectorComponent {

  profileIcons = profileIconNames;

  showAllIcons = true;
  selectedIcon: string | null = null;

  selectIcon(icon: string) {
    this.showAllIcons = !this.showAllIcons;
    this.selectedIcon = icon;
  }
}
