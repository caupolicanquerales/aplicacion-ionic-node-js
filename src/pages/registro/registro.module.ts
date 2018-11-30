import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPage } from './registro';
import { NgForm } from '@angular/forms';

@NgModule({
  declarations: [
    RegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroPage),
  ],
})
export class RegistroPageModule {

}
