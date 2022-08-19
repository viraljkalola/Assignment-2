import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from './users.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  //api path
  API_URL = environment.API_URL;

  //get all users
  getUsers(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  //create user
  createUser(data: Users): Observable<any> {
    return this.http.post(this.API_URL, data).pipe(catchError(this.handleError));
  }

  //update user detail
  updateUser(id:any,data: Users): Observable<any> {
    let baseUrl = `${this.API_URL}/${id}`;    
    return this.http.patch(baseUrl, data,{ headers: environment.HttpHeaders })
    .pipe(catchError(this.handleError));
  }

  //get single user detail
  getUser(id:any): Observable<any> {
    let baseUrl = `${this.API_URL}/${id}`;
    return this.http.get(baseUrl, { headers: environment.HttpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //delete user
  deleteUser(id:any): Observable<any> {
    let baseUrl = `${this.API_URL}/${id}`;
    return this.http.delete(baseUrl, { headers: environment.HttpHeaders })
    .pipe(catchError(this.handleError));
  }
  
  //error
  handleError(error: HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      //Handle client error
      errorMessage=error.error.message;
    }
    else{
      //Handle server error
      errorMessage=`Error Code: ${error.error.code} \nMessage: ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(()=>{
      errorMessage;
    });
  }

}
