import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from './app-routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authModulePath = appRoutes.authModule;

  constructor(public router: Router) { }
}
