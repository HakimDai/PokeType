import { Component, OnInit } from '@angular/core';
import { ResultDialogComponent } from 'src/app/selectType/result-dialog/result-dialog.component';
import {
  insecte,
  tenebres,
  electrique,
  fee,
  combat,
  feu,
  vol,
  spectre,
  plante,
  sol,
  glace,
  normal,
  poison,
  types,
  psy,
  roche,
  acier,
  eau,
  dragon,
} from 'src/app/shared/typeEffectiveness';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { selectTypes } from 'src/app/selectType/store/types-display.selectors';
import { Store } from '@ngrx/store';
import { State } from 'src/app/selectType/store/types-display.reducer';
import { loadTypes } from 'src/app/selectType/store/types-display.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './select-type-page.component.html',
  styleUrls: ['./select-type-page.component.scss'],
})
export class SelectTypePageComponent implements OnInit {
  secondTypeOnlyError = '';
  noTypeSelectionError = '';
  doubleType = '';
  pokeType = types;
  types$: Observable<{ name: string; url: string }[]> = this.store.select(
    selectTypes
  );
  selection = {
    type1: [],
    type2: [],
  };
  bestType = [];
  displayBestType = [];

  constructor(
    private bottomSheet: MatBottomSheet,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadTypes());
  }

  addType1(type) {
    this.secondTypeOnlyError = '';
    this.doubleType = '';
    this.noTypeSelectionError = '';
    this.displayBestType = [];
    this.selection.type1 = type.value;
  }

  addType2(type) {
    this.displayBestType = [];
    if (this.selection.type1.length === 0) {
      this.noTypeSelectionError = '';
      return (this.secondTypeOnlyError =
        'Merci de sélectionner un premier type');
    } else if (this.selection.type1 === type.value) {
      this.selection.type1 = [];
      this.doubleType =
        'Combinaison impossible choisissez un autre second type';
      return this.openBottomSheet();
    }
    this.doubleType = '';
    this.selection.type2 = type.value;
  }

  getBestTypes() {
    this.displayBestType = [];
    if (
      this.selection.type2.length === 0 &&
      this.selection.type1.length === 0 &&
      !this.secondTypeOnlyError
    ) {
      return (this.noTypeSelectionError =
        'Merci de sélectionner un ou deux types');
    } else if (
      this.selection.type1.length > 0 &&
      this.selection.type2.length > 0
    ) {
      for (let i = 0; i < 18; i++) {
        this.bestType.push([
          this.pokeType[i],
          this.selection.type1[i] * this.selection.type2[i],
        ]);
      }
    } else {
      for (let i = 0; i < 18; i++) {
        this.bestType.push([this.pokeType[i], this.selection.type1[i]]);
      }
    }
    this.bestType.sort((a, b) => b[1] - a[1]);
    if (this.bestType[0][1]) {
      for (let i = 0; i < 3; i++) {
        this.displayBestType.push(this.bestType[i]);
      }
    }
    this.selection.type1 = [];
    this.selection.type2 = [];
    this.bestType = [];
  }

  openBottomSheet(): void {
    this.bottomSheet.open(ResultDialogComponent, {
      data: [
        this.displayBestType,
        this.secondTypeOnlyError,
        this.noTypeSelectionError,
        this.doubleType,
      ],
    });
  }
}
