import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSpinnerVisible$: Observable<boolean> = this.spinnerService
    .isNavigationPending$;
  displaySpinner = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.isSpinnerVisible$.subscribe(
      (boolean) => (this.displaySpinner = boolean)
    );
  }
}
