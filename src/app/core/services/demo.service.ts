import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../config';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private loadindService: LoadingService) { }

  simulateQuery(response: any, status: 200 | 400 = 200): Observable<any> {
    return new Observable((observer) => {
      this.loadindService.start();
      setTimeout(() => {
        this.loadindService.stop();
        observer[status == 200 ? 'next': 'error'](response);
      }, config.demo.requestTime);
    });
  }

}
