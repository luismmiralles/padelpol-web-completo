import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GamesRoutingModule } from './games-routing.module';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { GameComponent } from './components/games-page/game/game.component';
import { ManageGameDialogComponent } from './components/games-page/manage-game-dialog/manage-game-dialog.component';

//MatDatepicker module
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Angular material 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CUSTOM_MAT_DATEPICKER_FORMAT } from '../core/helpers/custom-mat-datepicker-format';

@NgModule({
  declarations: [
    GamesPageComponent,
    GameComponent,
    ManageGameDialogComponent
  ],
  imports: [
    CommonModule, GamesRoutingModule, MatExpansionModule, MatIconModule,
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatAutocompleteModule,
    MatInputModule, ReactiveFormsModule, MatDatepickerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_MAT_DATEPICKER_FORMAT },
  ]
})
export class GamesModule { }
