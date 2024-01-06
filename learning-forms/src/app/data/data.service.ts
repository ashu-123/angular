import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  postUserSettings(userSettings: UserSettings): Observable<UserSettings> {
    return this.http.post<UserSettings>('https://putsreq.com/hK5CZUnWLa5nmKbBbADV', userSettings);
  }
}
