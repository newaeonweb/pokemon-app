import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { DeskService } from '@app/@pages/card/_services/desk.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/@pages/card/list/components/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { Card } from '@app/@pages/card/_interfaces/card.interface';
import { Subscription } from 'rxjs';
import { Theme, ThemeService } from '@app/@core/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  cartItems$ = this.deskService.items$;
  themeSub: Subscription;
  themeClass = '';

  constructor(
    @Inject(DOCUMENT) private document: any,
    public dialog: MatDialog,
    private titleService: Title,
    private translate: TranslateService,
    private deskService: DeskService,
    public theme: ThemeService
  ) {}

  ngOnInit() {
    this.currentTheme();
    this.themeSub = this.theme.theme$.subscribe((t: Theme) => {
      console.log(t);
      this.themeClass = t.name;
    });
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  currentTheme() {
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

  clearDesk() {
    this.deskService.cleanCart();
  }

  removeItem(card: Card) {
    this.confirmDialog(card);
  }

  confirmDialog(card?: Card) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('Confirm action'),
        message: `${this.translate.instant(
          'Are you sure, you want to exclude this card'
        )}: ${card?.name},
         ${this.translate.instant('from your poke-desk')}?`,
        card,
      },
    });
    confirmDialog.afterClosed().subscribe((item) => {
      if (item === false) {
        return;
      }
      this.deskService.removeItem(item.id);
    });
  }
}
