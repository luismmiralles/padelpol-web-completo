import { DemoService } from './demo.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../config';
import { PaddleLevelApiResponse } from '../models/interfaces/paddle-level-api-response';
import { paddleLevelsResponseDemo } from '../demo/paddle-levels-response-demo';

@Injectable({
  providedIn: 'root'
})
export class PadelpolApiService {

  constructor(private http: HttpClient, private demoService: DemoService) { }

  getPaddleLevels(): Observable<PaddleLevelApiResponse[]> {
    if (config.demo.runAsDemo) return this.demoService.simulateQuery(paddleLevelsResponseDemo);
    return this.http.get<PaddleLevelApiResponse[]>(`${config.apiUrl}/paddle-levels`);
  }
}
