import {HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {catchError, switchMap, throwError} from "rxjs";

let isRefreshing: boolean = false

export const authTokenInterceptor: HttpInterceptorFn = (req , next) => {
  // реквест - перехваченный реквест, а некст - функция, чтобы отпустить его

  const authService = inject(AuthService)
  const token = authService.token

  // Если токена нет
  if (!token) return next(req)

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addToken(req, token))
    .pipe(
      // Ловим ошибку
      catchError(error => {
         // В этой реализации 403 - токен протух
        if (error.status === 403) {
          // req - сам запрос, next - чтобы отпрвить его дальше
          return refreshAndProceed(authService, req, next);
        }
        return throwError(error)
      })
    )
}


const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true
    return authService.refreshAuthToken()
      .pipe(
        // ещё один pipe - switchMap
        // Мы получили запрос - по ответу от сервера поняли, что токен протух,
        // запросили токен заново и хотим заново отправить щапрос с нвоым токеном
        // Меняем стрим
        switchMap((res) => {
          isRefreshing = false
          return next(addToken(req, res.access_token))
        })

      )
  }

  return next(addToken(req, authService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
  // Планирование реквеста
  return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Bearer ключевое слово
      }
    })
}
