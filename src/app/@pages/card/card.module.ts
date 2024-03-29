import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardRoutingModule } from './card-routing.module';
import { CardListComponent } from './card-list/card-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { SelectSearchPipe } from './list/select-search.pipe';
import { PokeCardComponent } from './list/components/poke-card/poke-card.component';
import { PokeCardDetailComponent } from './list/components/poke-card-detail/poke-card-detail.component';
import { ConfirmDialogComponent } from './list/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    CardRoutingModule,
  ],
  declarations: [
    CardComponent,
    CardListComponent,
    ListComponent,
    SelectSearchPipe,
    PokeCardComponent,
    PokeCardDetailComponent,
    ConfirmDialogComponent,
  ],
})
export class CardModule {}
