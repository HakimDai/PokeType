import {Component, OnInit} from '@angular/core';
import {SpinnerService} from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displaySpinner = false;

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.isNavigationPending$.subscribe(
      (boolean) => {
        this.displaySpinner = boolean;
      }
    );
  }
}
