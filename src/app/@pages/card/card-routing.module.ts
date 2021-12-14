import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: CardComponent,
    data: { title: marker('Card') },
    children: [{ path: '', component: ListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CardRoutingModule {}
