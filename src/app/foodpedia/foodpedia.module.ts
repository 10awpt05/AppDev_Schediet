import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodpediaPageRoutingModule } from './foodpedia-routing.module';

import { FoodpediaPage } from './foodpedia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodpediaPageRoutingModule
  ],
  declarations: [FoodpediaPage]
})
export class FoodpediaPageModule {}
