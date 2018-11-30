import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { AlertController } from 'ionic-angular';
import { DatosProvider} from '../../providers/datos/datos';

@IonicPage()
@Component({
  selector: 'page-menugeneral',
  templateUrl: 'menugeneral.html',
})
export class MenugeneralPage {

  productos:any=[];
  objeto:any;
  tituloMensaje:string;
  mensaje:string;
  categorias=[{label:'Hamburguesa Carne',value:'1'},{label:'Hamburguesa Pollo',value:'2'},
              {label:'Hamburguesa Mixta',value:'3'},{label:'Perros Calientes',value:'4'},
              {label:'Pepitos Carne',value:'5'},{label:'Pepitos Pollo',value:'6'},
              {label:'Pepitos Mixto',value:'7'},{label:'Refrescos',value:'8'},
              {label:'Jugos',value:'9'}];

  constructor(public navCtrl: NavController, public navParams: NavParams,private servicio:ServicioProvider,
            private alert:AlertController, private datos:DatosProvider) {
  }

  ionViewDidLoad() {
    this.servicio.getConsultaGeneralMenu().subscribe((data)=>{
      this.productos=data.resultado;
      console.log(data.resultado,localStorage.getItem('token'));
    });
  }

////////////////////////////////////////////////////////////////////////////////////////
/* Metodo para ejecutar accion de ejecutar ORDEN de COMPRA*/  
  public accionParaOrdenarCompraPorItem(producto:any){
    
    this.objeto={
      id_item:producto.id_item,
      id_orden:this.datos.getterOrdenId()
    };

    if(localStorage.getItem('token')===null){//verifica si existe TOKEN para efectuar operacion
      this.tituloMensaje='Advertencia';
      this.mensaje='No existe sesion abierta';
      this.metodoAlarma();
    }else if(localStorage.getItem('token')!=null && this.datos.getterOrdenId()!=undefined)
    {
      
      this.servicio.postGenerarOrdenCompraPorItem(this.objeto).subscribe((data)=>{
        console.log(data);
        this.tituloMensaje='Operacion Exitosa';
        this.mensaje='Orden Procesada';
        this.metodoAlarma();
      });
    }
      
  }


/////////////////////////////////////////////////////////////////////////////////////////////
/** Metodo para efectuar consulta por CATEGORIA */
  public busquedaPorCategoria(){
    let alerta=this.alert.create();
    alerta.setTitle('Categorias');
    
    for(var i=0;i<this.categorias.length;i++){
      alerta.addInput({
        type:'radio',
        label:this.categorias[i].label,
        value:this.categorias[i].value  
      });
    }

    alerta.addButton('Cancel');
    alerta.addButton({
      text:'Ok',
      handler:data=>{
        this.servicio.getConsultaCategoriaMenu(data).subscribe((informacion)=>{
          this.productos=informacion.resultado;
          this.datos.setterCategoria(data);
        });
      }
    });
    alerta.present();
  }


  public generarOrden(){

    if(this.datos.getterOrdenId()==undefined){
      let objeto={
        id_usuario:this.datos.getterUsuarioId()
      };
      this.servicio.postGenerarOrdenCompra(objeto).subscribe((informacion)=>{
        if(informacion.status===200){
          this.tituloMensaje='Operacion Exitosa';
          this.mensaje='Orden Generada';
          this.datos.setterOrdenId(informacion.resultado[0].id_orden);
          this.metodoAlarma();
        }else{
          this.tituloMensaje='Advertencia';
          this.mensaje='No existe sesion abierta';
          this.metodoAlarma();
        }
      });
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
