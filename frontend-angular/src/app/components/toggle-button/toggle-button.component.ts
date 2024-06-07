import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ButtonType } from '../../models/toggle-button.model';

@Component({
  selector: 'toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {
    @Input() options!: ButtonType[];
    @Input() activeOption!: ButtonType;
    @Output() toggled = new EventEmitter<boolean>();

    ngOnInit(): void {
        this.activeOption = this.activeOption || this.options[0]
    }

    toggle(option: any): void {
        this.activeOption = option;
        this.toggled.emit(option)
    }
}
