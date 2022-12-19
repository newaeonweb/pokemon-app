import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { DeskService } from '@app/@pages/card/_services/desk.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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
    if (this.checkThemeIsSelected()) {
      this.themeClass = this.checkThemeIsSelected() as string;
    } else {
      this.themeSub = this.theme.theme$.subscribe((t: Theme) => {
        this.themeClass = t.name;
      });
    }
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  checkThemeIsSelected() {
    const isThemeSelected = localStorage.getItem('theme');
    if (isThemeSelected) {
      return isThemeSelected;
    } else {
      return false;
    }
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
