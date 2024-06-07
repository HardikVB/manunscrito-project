import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
    @Input() label?: string;
    @Input() options: any[] = [];
    @Input() selectedOption: any;
    @Output() optionSelected = new EventEmitter<any>();

    isDropdownOpen: boolean = false;

    selectOption(option: any): void {
        this.selectedOption = option;
        this.isDropdownOpen = !this.isDropdownOpen;
        this.optionSelected.emit(option);
    }

    toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }
}
