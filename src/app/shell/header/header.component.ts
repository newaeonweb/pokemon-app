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

  ngOnInit() {
    this.currentTheme;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  get currentTheme() {
    const darkTheme = localStorage.getItem('dark-theme');
    if (darkTheme) {
      return this.document.body.classList.add('dark-theme');
    }
  }

  changeTheme() {
    const darkTheme = localStorage.getItem('dark-theme');
    if (darkTheme) {
      this.document.body.classList.remove('dark-theme');
      localStorage.removeItem('dark-theme');
      return;
    }
    this.document.body.classList.add('dark-theme');
    localStorage.setItem('dark-theme', 'true');
  }
}
