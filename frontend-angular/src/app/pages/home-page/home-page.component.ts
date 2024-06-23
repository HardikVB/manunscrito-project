import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePage {
    carouselItems: { src: string; title: string }[] = [
        {src: "assets/background-1.jpeg", title: "MANUSCRITOS LIVROS ANTIGOS GRAVURAS"},
        {src: "assets/background-2.jpg", title: "LIVROS RAROS "},
        {src: "assets/background-3.jpg", title: "POSTAIS MANUSCRITOS"}
    ]

    gridImages: string[] = [];

    constructor() {
      for(let i = 1; i <= 16; i++) {
        this.gridImages.push(`assets/grid-image (${i}).jpg`);
      }
    }
}