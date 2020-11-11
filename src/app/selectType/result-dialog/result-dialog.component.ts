import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent implements OnInit {
  dataSource = this.data;

  constructor(
    // tslint:disable-next-line:variable-name
    private _bottomSheetRef: MatBottomSheetRef<ResultDialogComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
