import { Injectable, Inject } from '@angular/core';
import { HttpClient as AngularHttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../app.config';

export class RequestParameters {
  public controller: string;
  public action?: string;
  public queryString?: string;
  public headers?: HttpHeaders;
  public baseUrl?: string;
  public fullEndpoint?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpClient {
  constructor(
    private httpClient: AngularHttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  get<T>(requestParameter: Partial<RequestParameters>) {
    let url: string = "";

    url = `${this.url(requestParameter)}`;
    return this.httpClient.get<T>(url);
  }

  post<T>(requestParameter: Partial<RequestParameters>, body: any) {
    let url: string = "";

    url = `${this.url(requestParameter)}`;
    return this.httpClient.post<T>(url, body);
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: any) {
    let url: string = "";

    url = `${this.url(requestParameter)}`;
    return this.httpClient.put<T>(url, body);
  }

  delete<T>(requestParameter: Partial<RequestParameters>) {
    let url: string = "";

    url = `${this.url(requestParameter)}`;
    return this.httpClient.delete<T>(url);
  }
}