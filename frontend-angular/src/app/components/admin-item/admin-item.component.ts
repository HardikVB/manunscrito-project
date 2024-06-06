import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.scss']
})


export class AdminItemComponent {
  @Input() title!: string;
  @Input() icon!: string;

  @Output() clickItem: EventEmitter<Event> = new EventEmitter<Event>()
  
  clickedOnItem(event: Event) {
    this.clickItem.emit(event);
  }
}