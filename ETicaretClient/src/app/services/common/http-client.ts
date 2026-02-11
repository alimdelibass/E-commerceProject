import { Injectable } from '@angular/core';
import { HttpClient as AngularHttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClient {
  constructor(private httpClient: HttpClient) {}
  get(){
    
  }
}
