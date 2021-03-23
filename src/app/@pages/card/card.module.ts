import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardRoutingModule } from './card-routing.module';
import { CardListComponent } from './card-list/card-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@shared';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    CardRoutingModule,
  ],
  declarations: [CardComponent, CardListComponent],
})
export class CardModule {}
