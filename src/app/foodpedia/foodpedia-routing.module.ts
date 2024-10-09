import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodpediaPage } from './foodpedia.page';

const routes: Routes = [
  {
    path: '',
    component: FoodpediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodpediaPageRoutingModule {}
