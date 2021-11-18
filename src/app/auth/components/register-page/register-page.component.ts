import { PadelpolApiService } from './../../../core/services/padelpol-api.service';
import { SweetAlertService } from './../../../core/services/sweet-alert.service';
import { PaddleLevelApiResponse } from '../../../core/models/interfaces/paddle-level-api-response';
import { AuthApiService } from './../../services/auth-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { appRoutes } from 'src/app/app-routes';
import { authRoutes } from '../../auth-routes';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm = this.fb.group({
    name: [''],
    paddle_level_id: [''],
    email: [''],
    password: [''],
    password_confirmation: [''],
  });

  paddleLevels: PaddleLevelApiResponse[] = [];
  filteredPaddleLevels: Observable<PaddleLevelApiResponse[]>;

  loginPagePath = `/${appRoutes.authModule}/${authRoutes.loginPage}`;

  constructor(private fb: FormBuilder, private authApiService: AuthApiService, private sweetAlertService: SweetAlertService, private padelpolApiService: PadelpolApiService) { }

  ngOnInit(): void {
    this.padelpolApiService.getPaddleLevels().subscribe((res: any) => {
      this.paddleLevels = res;
      this.registerForm.controls.paddle_level_id.setValue("");
    });

    this.filteredPaddleLevels = this.registerForm.controls.paddle_level_id.valueChanges.pipe(
      map((value: string | number) => {
        if (typeof value == 'number') value = this.paddleLevels.find((e: PaddleLevelApiResponse) => e.id == value)?.name || "";
        return this._filter(value);
      })
    );
  }

  private _filter(value: string): PaddleLevelApiResponse[] {
    const filterValue = value.toLowerCase();
    return this.paddleLevels.filter(pl => pl.name.toLowerCase().includes(filterValue));
  }

  displayPL = (id: number): string => {
    return id && this.paddleLevels.find(e => e.id == id)?.name || '';
  }

  onRegisterSubmit(): any {
    if (typeof this.registerForm.value.paddle_level_id != 'number') return this.sweetAlertService.warning("El nivel de padel es requerido", "Seleccione uno");
    if (this.registerForm.value.password != this.registerForm.value.password_confirmation) return this.sweetAlertService.warning("Las contraseñas han de ser iguales");
    this.authApiService.register(this.registerForm.value).subscribe(res => {
      this.sweetAlertService.success("El usuario se ha creado correctamente", "Ya puede iniciar sesión");
      this.resetForm();
    }, err => {
      this.sweetAlertService.error("El correo introducido ya está siendo utilizado");
    })
  }

  private resetForm() {
    this.registerForm.patchValue({
      name: '',
      paddle_level_id: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  }

}
