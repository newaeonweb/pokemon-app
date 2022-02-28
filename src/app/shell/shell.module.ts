import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { I18nModule } from '@app/i18n';
import { MaterialModule } from '@app/material.module';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '@app/@shared';
import { DropdownTriggerDirective } from './header/dropdown/dropdown-trigger.directive';
import { DropdownComponent } from './header/dropdown/dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    I18nModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    ShellComponent,
    LoaderComponent,
    DropdownTriggerDirective,
    DropdownComponent,
  ],
})
export class ShellModule {}
