import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {
  @Input() label: string = ''; // Input property for button label
  @Input() icon: string = ''; // Input property for button label
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>(); // Output event emitter for click action

  constructor() { }

  buttonClicked(): void {
    this.onClick.emit(); // Emit click event
  }
}
