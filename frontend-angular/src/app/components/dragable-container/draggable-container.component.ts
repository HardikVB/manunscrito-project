import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'draggable-container',
  templateUrl: './draggable-container.component.html',
  styleUrls: ['./draggable-container.component.scss']
})
export class DragableContainerComponent implements AfterViewInit {
  cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'];

  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;

  ngAfterViewInit() {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      let isDown = false;
      let startX: any;
      let scrollLeft: any;

      container.addEventListener('mousedown', (e: any) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
      });

      container.addEventListener('mousemove', (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX); // Quanto mover o scroll
        container.scrollLeft = scrollLeft - walk;
      });
    }
  }
}
