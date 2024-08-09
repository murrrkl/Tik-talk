import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {TokenResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/'

  token: string | null = null; // При запросе будет сохранён вернувшийся токен
  refreshToken: string | null = null;

  // Авторизован или нет
  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')  // Получаем из кук
      this.refreshToken = this.cookieService.get('refresh_token')
    }

    return !!this.token; // Перевод строки в boolean
  }


  login(payload: {username: string, password: string}) {
    const fd: FormData = new FormData();

    fd.append('username', payload.username); //
    fd.append('password', payload.password); // YDOYfKQWLa

    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      fd // Тело запроса
    ).pipe(
      tap(val => this.saveTokens(val)),
    )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}refresh`,
      {
      refresh_tocken:  this.refreshToken
    }).pipe(
      // Хотим сохранить новый преобретённый токен
      tap(val => this.saveTokens(val)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    this.cookieService.deleteAll() // Удаляем куки
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }


  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    // Сохраняем в куки
    this.cookieService.set('token', this.token);
    this.cookieService.set('refresh_token', this.refreshToken);
  }
}

