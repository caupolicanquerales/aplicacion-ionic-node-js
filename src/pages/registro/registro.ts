import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  objeto:any;
  mensaje:string;
  tituloMensaje:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private servicio:ServicioProvider,
              private alert:AlertController) {
  }

  public activacion(forma:NgForm){
    this.objeto={
      'email':forma.value.email,
      'password':forma.value.password,
      'password2':forma.value.password2
    };
    forma.resetForm();

    this.servicio.postRegistroDeUsuario(this.objeto).subscribe((data)=>{
      if(data.errors){
        this.mensaje=data.errors[0].msg;
        this.tituloMensaje='Advertencia';
        this.metodoAlarma();
      }else{
        if(data.status!=200){
          this.tituloMensaje='Advertencia';
          this.mensaje=data.msg;
          this.metodoAlarma();
        }else{
          this.tituloMensaje='Operacion Exitosa';
          this.mensaje=data.msg;
          this.metodoAlarma();
        }
      }
    });
  }

///////////////////////////////////////////////////////////////////////////////////////
/** Metodo para crear un mesaje de alarma en el proceso de REGISTRO */
  private metodoAlarma(){
    let alerta= this.alert.create(
      {
        title:this.tituloMensaje,
        message:this.mensaje,
        buttons:[
          {
            text:'OK',
            role:'cancel',
            handler:()=>{
              console.log('alerta fue cerrada');
            }
          }
        ]
      }
    );
    alerta.present();
  }

}
