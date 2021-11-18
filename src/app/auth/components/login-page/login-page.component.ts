import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/app-routes';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { authRoutes } from '../../auth-routes';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  registerPagePath = `/${appRoutes.authModule}/${authRoutes.registerPage}`;

  constructor(private fb: FormBuilder, private authApiService: AuthApiService, private sessionStorageService: SessionStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    this.authApiService.login(this.loginForm.value).subscribe(res => {
      this.sessionStorageService.setItem("token", res.access_token);
      this.router.navigate([appRoutes.gamesModule]);
    });
  }

}
