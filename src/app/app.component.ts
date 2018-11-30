import { Component, ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { MenuController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { MenugeneralPage } from '../pages/menugeneral/menugeneral';
import { FacturaPage } from '../pages/factura/factura';
import { ServicioProvider } from '../providers/servicio/servicio';
import { AlertController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav:Nav;// Forma de declarar "nav" en la clase APP para el manejo de ROUTING the pages

  mensaje:string;
  tituloMensaje:string;

  rootPage:any = TabsPage;

  pages: Array<{title:string,component:any}>=[{title:"Login",component:LoginPage},
        {title:"Registro",component:RegistroPage},{title:"Menu General",component:MenugeneralPage},
        {title:"Facturacion",component:FacturaPage}];//Arreglo para guardar los componentes a redireccionar

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private servicio:ServicioProvider,private alert:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page){
    this.nav.push(page.component);
    console.log('Primera seleccion activada');
  }

  metodoParaCerraSesion(){
    
    if(localStorage.getItem('token')===null){
      this.tituloMensaje='Advertencia';
      this.mensaje='No existe sesion abierta';
      this.metodoAlarma();
    }else{
      this.servicio.metodoParaLogOut();
      this.tituloMensaje='Operacion Exitosa';
      this.mensaje='La sesion fue cerrada';
      this.metodoAlarma();
    }
    
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
