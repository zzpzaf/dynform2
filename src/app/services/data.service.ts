import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from '../dataObjects/iitem';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ICategory } from '../dataObjects/icatecory';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //baseURL:string = 'http://localhost:8080/api/';
  baseURL:string = '/assets/'

  getItems(): Observable<IItem[]> {
    let items: Observable<IItem[]> = this.http
      .get<IItem[]>(this.baseURL +`items.json`)
      .pipe(retry(1), catchError(this.handleError));
    return items;
  }

  getCategories(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(this.baseURL +`categories.json`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}
