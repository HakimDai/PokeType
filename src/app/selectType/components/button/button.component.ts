import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() isDisabled = false;
  @Input() message: string;
  @Output() buttonClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
