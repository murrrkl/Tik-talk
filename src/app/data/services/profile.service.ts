import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../intefraces/profile.interface";
import {Pageble} from "../intefraces/pageble.interface";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  getSubscribesShortList() {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers`)
  }

  getTestAccount() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
  }
}
