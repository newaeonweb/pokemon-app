import { ViewEncapsulation } from '@angular/compiler';
import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { DeskService } from '@app/@pages/card/_services/desk.service';
import { DropdownPanel } from './dropdown-panel';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements DropdownPanel {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @Output() closed = new EventEmitter<void>();
  cartItems$ = this.deskService.items$;

  constructor(private deskService: DeskService) {}

  clearDesk() {
    this.deskService.cleanCart();
  }
}
