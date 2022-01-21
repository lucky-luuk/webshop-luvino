import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() message: string = '';

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.location.back();
  }

}
