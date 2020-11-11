import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { TypesService } from 'src/app/selectType/services/types.service';
import { of } from 'rxjs';
import * as fromTypesDisplayActions from 'src/app/selectType/store/types-display.actions';

@Injectable()
export class TypesDisplayEffects {

  loadTypes$ = createEffect(() => this.actions$.pipe(
    ofType(fromTypesDisplayActions.loadTypes),
    mergeMap(() => this.typesService.fetchTypes()
      .pipe(
        map(types => types.results),
        map(types => fromTypesDisplayActions.loadTypesSuccess({ types })),
        catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
      ))
  ));

  constructor(private actions$: Actions, private typesService: TypesService) {
  }
}
