import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public toastr:ToastController) {

  }

  public activacion(forma:NgForm){
    console.log('valores:',forma.value.nombre,forma.value.password);
    forma.resetForm();
    this.metodoToastr();
  }

  private metodoToastr(){
    const toast= this.toastr.create(
      {
        message:'Ejecucion activada',
        duration:1500,
        position:'top'
      }
    );
    toast.present();
  }

  
 
}
