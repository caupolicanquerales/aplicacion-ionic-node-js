import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatosProvider} from '../../providers/datos/datos';
import { ServicioProvider} from '../../providers/servicio/servicio';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-factura',
  templateUrl: 'factura.html',
})
export class FacturaPage {


  tituloMensaje:string;
  mensaje:string;
  numeroOrden:string;
  itemFacturados:any=[];
  costoFacturado:any=[];
  array=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private datos:DatosProvider,private servicio:ServicioProvider,private alert:AlertController) {
  }

  ionViewDidLoad() {

    this.metodoParaGenerarFacturacion();
  }
////////////////////////////////////////////////////////////////////////////////////////
/** Metodo para guardar en un ARRAY las selecciones de ITEM a eliminar */
  public itemParaEliminar(producto,ev,i){
    if(ev.value){  
      let objeto={
        item:producto,
        index:i
      }
      this.array.push(objeto);
    }else{
      let posicion=0;
      this.array.forEach(element=>{
        if(element.index===i){
          this.array.splice(posicion,1);//elimina el elemento con "POSICION" en el ARRAY
        }
        posicion++;
      });
    }  
  }
//////////////////////////////////////////////////////////////////////////////////////////////////
/** Metodo encargado de ordenar la realizacion de la FACTURA */
  public metodoParaGenerarFacturacion(){
    this.numeroOrden= this.datos.getterOrdenId();
    let objeto={
      id_orden:this.numeroOrden
    };
    this.servicio.getGenerarFactura(objeto).subscribe((data)=>{
      if(data.errors){
        console.log('error en el proceso');
      }else{
        if(data.status!=200){
          console.log(data);
        }else{
          this.costoFacturado[0]=data.costoFacturado;
          this.itemFacturados=data.itemFacturados;
        }
      }
    });
  }


//////////////////////////////////////////////////////////////////////////////////////////////////
/** Metodo para ejecutar actualizacion de lista de ordenes por ITEMS */
  public metodoParaActualizarListaCompra(){

    if(this.datos.getterOrdenId()!=undefined){
      let objeto={
        itemsBorrar:this.array
      };
      this.servicio.postGenerarBorrarItemOrden(objeto).subscribe((data)=>{
        if(data.errors){
          console.log('error en el proceso');
        }else{
          if(data.status!=200){
            console.log(data);
          }else{
            this.metodoParaGenerarFacturacion();
          }
        }
      });
    }else{
      this.tituloMensaje='Advertencia';
      this.mensaje='No exites orden generada';
      this.metodoAlarma();
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////
  public metodoParaProcesarFactura(){

    if(this.datos.getterOrdenId()!=undefined){
      this.numeroOrden= this.datos.getterOrdenId();
      let objeto={
        id_orden:this.numeroOrden
      };
      this.servicio.postGenerarPagoOrden(objeto).subscribe((data)=>{
        if(data.errors){
          console.log('error en el proceso');
        }else{
          if(data.status!=200){
            this.tituloMensaje='Advertencia';
            this.mensaje='Ocurrio un error';
            this.metodoAlarma();
          }else{
            this.datos.setterOrdenId(null);
            this.tituloMensaje='Operacion Exitosa';
            this.mensaje='Orden procesada y cerrada';
            this.metodoAlarma();                
          }
        }
      });
    }else{
      this.tituloMensaje='Advertencia';
      this.mensaje='No exites orden generada';
      this.metodoAlarma();
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////
/** Metodo encargado de cancelar la orden, accion que borrara en el BASE DATOS lo referente a la orden ABIERTA */
  public metodoParaCancelarOrden(){
    
    if(this.datos.getterOrdenId()!=undefined){
      this.numeroOrden= this.datos.getterOrdenId();
      let objeto={
        id_orden:this.numeroOrden
      };
      this.servicio.postGenerarCancelarOrden(objeto).subscribe((data)=>{
        if(data.errors){
          console.log('error en el proceso');
        }else{
          if(data.status!=200){
            this.tituloMensaje='Advertencia';
            this.mensaje='Ocurrio un error';
            this.metodoAlarma();
          }else{
            this.datos.setterOrdenId(null);
            this.tituloMensaje='Operacion Exitosa';
            this.mensaje='La orden fue cancelada';
            this.metodoAlarma();                
          }
        }
      });
    }else{
      this.tituloMensaje='Advertencia';
      this.mensaje='No exites orden generada';
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
              this.navCtrl.pop();
            }
          }
        ]
      }
    );
    alerta.present();
  }


}
