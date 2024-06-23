import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPage {
  language: string = "pt";

  constructor(private activatedRoute: ActivatedRoute) {
    
  }
}
