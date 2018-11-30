import { Injectable } from '@angular/core';


@Injectable()
export class DatosProvider {

  categoria:string;
  id_usuario:string;
  id_orden:string;

  constructor() {
  }

  public setterCategoria(categoria:string){
    this.categoria=categoria;
  }
  public getterCategoria(){
    return this.categoria;
  }
  
  public setterUsuarioId(id_usuario:string){
    this.id_usuario=id_usuario;
  }
  public getterUsuarioId(){
    return this.id_usuario;
  }

  public setterOrdenId(id_orden:string){
    this.id_orden=id_orden;
  }
  public getterOrdenId(){
    return this.id_orden;
  }
}
