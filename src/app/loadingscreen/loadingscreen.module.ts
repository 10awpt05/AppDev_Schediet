import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingscreenPageRoutingModule } from './loadingscreen-routing.module';

import { LoadingscreenPage } from './loadingscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingscreenPageRoutingModule
  ],
  declarations: [LoadingscreenPage]
})
export class LoadingscreenPageModule {}
