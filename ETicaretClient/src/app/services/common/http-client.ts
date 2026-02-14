import { Injectable, Inject } from '@angular/core';
import { HttpClient as AngularHttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../app.config';

export class RequestParameters {
  public controller: string;
  public action?: string;
  public queryString?: string;
  public headers?: HttpHeaders;
  public baseUrl?: string;
  public fullEndPoint?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: AngularHttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${id ? `/${id}` : ''}`;

    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
  }

  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}`;

    return this.httpClient.post<T>(url, body, { headers: requestParameter.headers });
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: any): Observable<T> {
    let url: string = "";

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}`;

    return this.httpClient.put<T>(url, body, { headers: requestParameter.headers });
  }

  delete<T>(requestParameter: Partial<RequestParameters>): Observable<T> {
    let url: string = "";

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}`;

    return this.httpClient.delete<T>(url, { headers: requestParameter.headers });
  }
}