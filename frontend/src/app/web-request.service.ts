import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly Root_URL;

  constructor(private http: HttpClient) {

    this.Root_URL = 'http://localhost:3000';

  }

  get(url: string) {
    return this.http.get(`${this.Root_URL}/${url}`);
  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.Root_URL}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.Root_URL}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.Root_URL}/${url}`);
  }
}
