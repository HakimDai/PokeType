import {Component, OnInit} from '@angular/core';
import {ResultDialogComponent} from '../result-dialog/result-dialog.component';
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
  pokeType,
  psy,
  roche,
  acier,
  eau,
  dragon
} from '../../shared/typeEffectiveness';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  secondTypeOnlyError = '';
  noTypeSelectionError = '';
  doubleType = '';
  pokeType = pokeType;
  table = {
    normal,
    combat,
    vol,
    poison,
    sol,
    roche,
    insecte,
    spectre,
    acier,
    feu,
    eau,
    plante,
    electrique,
    psy,
    glace,
    dragon,
    tenebres,
    fee,
  };
  selection = {
    type1: [],
    type2: []
  };
  bestType = [];
  displayBestType = [];


  constructor(private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
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
      return this.secondTypeOnlyError = 'Merci de sélectionner un premier type';
    } else if (this.selection.type1 === type.value) {
      this.selection.type1 = [];
      this.doubleType = 'Combinaison impossible choisissez un autre second type';
      return this.openBottomSheet();
    }
    this.doubleType = '';
    this.selection.type2 = type.value;
  }

  getBestTypes() {
    this.displayBestType = [];
    if (this.selection.type2.length === 0 && this.selection.type1.length === 0 && !this.secondTypeOnlyError) {
      return this.noTypeSelectionError = 'Merci de sélectionner un ou deux types';
    } else if (this.selection.type1.length > 0 && this.selection.type2.length > 0) {
      for (let i = 0; i < 18; i++) {
        this.bestType.push([this.pokeType[i], (this.selection.type1[i] * this.selection.type2[i])]);
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
      data:
        [this.displayBestType, this.secondTypeOnlyError, this.noTypeSelectionError, this.doubleType]
    });
  }

}
