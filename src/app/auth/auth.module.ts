import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPageComponent } from './components/register-page/register-page.component';

// Angular material 
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule, AuthRoutingModule, MatIconModule, MatFormFieldModule,
    MatAutocompleteModule, MatInputModule, MatButtonModule, ReactiveFormsModule
  ]
})
export class AuthModule { }
