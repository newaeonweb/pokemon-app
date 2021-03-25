import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  constructor(@Inject(DOCUMENT) private document: any, private titleService: Title) {}

  ngOnInit() {}

  get title(): string {
    return this.titleService.getTitle();
  }

  changeTheme() {
    this.document.body.classList.toggle('dark-theme');
  }
}
