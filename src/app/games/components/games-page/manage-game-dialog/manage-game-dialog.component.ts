import { SweetAlertService } from './../../../../core/services/sweet-alert.service';
import { autocompleteFilterFunction } from './../../../../core/helpers/autocomplete-filter-function';
import { PadelpolApiService } from './../../../../core/services/padelpol-api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaddleLevelApiResponse } from 'src/app/core/models/interfaces/paddle-level-api-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/games/models/game';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-manage-game-dialog',
  templateUrl: './manage-game-dialog.component.html',
  styleUrls: ['./manage-game-dialog.component.scss']
})
export class ManageGameDialogComponent implements OnInit {

  gameForm = this.fb.group({
    id: [],
    location: [],
    date: [],
    time: [],
    duration: [],
    courtPrice: [],
    paddleLevel: []
  });

  paddleLevels: PaddleLevelApiResponse[];
  filteredPaddleLevels: Observable<PaddleLevelApiResponse[]>;

  constructor(public dialogRef: MatDialogRef<ManageGameDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Game | undefined, private fb: FormBuilder, private padelpolApiService: PadelpolApiService, private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    console.log(this.data);
    
    if (this.data) this.gameForm.patchValue(Object.assign(this.data, { time: this.data.date.format('HH:mm') }));

    this.padelpolApiService.getPaddleLevels().subscribe(res => {
      this.paddleLevels = res;
      if (!this.data) this.gameForm.controls.paddleLevel.setValue("");
    });

    this.filteredPaddleLevels = this.gameForm.controls.paddleLevel.valueChanges
      .pipe(
        map((value: string | PaddleLevelApiResponse) => {
          if (typeof value != 'string') value = value.name;
          return autocompleteFilterFunction(this.paddleLevels, 'name', value);
        })
      );
  }

  displayFn(pl: PaddleLevelApiResponse): string {
    return pl && pl.name ? pl.name : '';
  }

  onGameFormSubmit(): any {
    if (!this.gameForm.value.paddleLevel.id) return this.sweetAlertService.warning("El nivel de padel es obligatorio");
    const game = new Game(Object.assign(this.gameForm.value, {
      date: moment(`${this.gameForm.value.date.format('YYYY-MM-DD')} ${this.gameForm.value.time}`)
    }));
    this.dialogRef.close(game);
  }

}
