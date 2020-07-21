import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Token } from './token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  accessToken: string;
  preauthToken: string;

  // private authUrl = 'api/auth';
  private authUrl = '/web-auth/auth/token';

  getTokenByCode(code: string): Observable<Token> {
    const url = `${this.authUrl}/get_token?code=${code}`;
    return this.http.get<Token>(url, this.httpOptions).pipe(
      tap((_) => this.log(`getTokenByCode code=${code}`)),
      catchError(this.handleError<Token>(`getTokenByCode code=${code}`))
    );
  }

  getTokenByRefreshToken(refreshToken: string): Observable<Token> {
    const url = `${this.authUrl}/refresh?refresh_token=${refreshToken}`;
    return this.http.get<Token>(url, this.httpOptions).pipe(
      tap((_) =>
        this.log(`getTokenByPreauthToken refresh_token=${refreshToken}`)
      ),
      catchError(
        this.handleError<Token>(
          `getTokenByPreauthToken refresh_token=${refreshToken}`
        )
      )
    );
  }

  private log(message: string) {
    console.log('log:', message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
