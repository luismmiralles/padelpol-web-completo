import { registerResponseDemo } from './../demo/register-response-demo';
import { DemoService } from './../../core/services/demo.service';
import { RegisterApiRequest } from './../interfaces/register-api-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/core/config';
import { RegisterApiResponse } from '../interfaces/register-api-response';
import { LoginApiRequest } from '../interfaces/login-api-request';
import { LoginApiResponse } from '../interfaces/login-api-response';
import { loginResponseDemo } from '../demo/login-response-demo';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient, private demoService: DemoService) { }

  register(params: RegisterApiRequest): Observable<RegisterApiResponse> {
    if (config.demo.runAsDemo) return this.demoService.simulateQuery(registerResponseDemo);
    return this.http.post<RegisterApiResponse>(`${config.apiUrl}/auth/register`, params);
  }
  
  login(params: LoginApiRequest): Observable<LoginApiResponse> {
    if (config.demo.runAsDemo) return this.demoService.simulateQuery(loginResponseDemo);
    return this.http.post<LoginApiResponse>(`${config.apiUrl}/auth/login`, params);
  }

}
