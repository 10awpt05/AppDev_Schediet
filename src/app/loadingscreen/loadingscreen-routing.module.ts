import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingscreenPage } from './loadingscreen.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingscreenPageRoutingModule {}
