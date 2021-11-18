import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { User } from './../../core/models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { appRoutes } from 'src/app/app-routes';
import { authRoutes } from 'src/app/auth/auth-routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | null;

  paths = {
    gamesPath: `${appRoutes.gamesModule}`
  }

  constructor(public router: Router, public authService: AuthService, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  openShowUserDialog() { }

  logOut() {
    this.sessionStorageService.removeItem("token");
    this.router.navigate([`${appRoutes.authModule}/${authRoutes.loginPage}`]);
  }

}
