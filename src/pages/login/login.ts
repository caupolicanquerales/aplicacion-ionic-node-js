import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { DatosProvider } from '../../providers/datos/datos';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  objeto:any;
  mensaje:string;
  tituloMensaje:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private servicio:ServicioProvider,
            private alert:AlertController, private datos:DatosProvider) {
  }

  ionViewDidLoad() {

  }

  public activacion(forma:NgForm){

    this.objeto={
      email:forma.value.email,
      password:forma.value.password
    }
    forma.resetForm();
    this.servicio.postLoginDeUsuario(this.objeto).subscribe((data)=>{
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
          localStorage.setItem('token',data.token);
          this.datos.setterUsuarioId(data.id_usuario);//guarda el valor en una clase PROVIDER
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
