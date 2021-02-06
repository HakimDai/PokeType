import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  isNavigationPending$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

}
