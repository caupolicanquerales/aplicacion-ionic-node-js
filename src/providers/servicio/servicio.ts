import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

/*
  Generated class for the ServicioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioProvider {

  dominioServidor:string='http://localhost:3000/papas/';//variables para establecer conexion con el servidor
  extension:string;
  objeto:any;

  constructor(public http: HttpClient) {
  }

  public postRegistroDeUsuario(objeto:any):Observable<any>{
    this.objeto=objeto;
    this.extension='registro';
    return this.http.post<any>(`${this.dominioServidor}${this.extension}`,this.objeto).pipe(catchError(this.handleError('error',[])));
  }

  public postLoginDeUsuario(objeto:any):Observable<any>{
    this.objeto=objeto;
    this.extension='login';
    return this.http.post<any>(`${this.dominioServidor}${this.extension}`,this.objeto).pipe(catchError(this.handleError('error',[])));
  }

  public getConsultaGeneralMenu():Observable<any>{
    this.extension='items';
    return this.http.get<any>(`${this.dominioServidor}${this.extension}`).pipe(catchError(this.handleError('error',[])));
  }
  public getConsultaCategoriaMenu(categoria:string):Observable<any>{
    this.extension=`items/${categoria}`;
    return this.http.get<any>(`${this.dominioServidor}${this.extension}`).pipe(catchError(this.handleError('error',[])));
  }

  public postGenerarOrdenCompra(objeto:any):Observable<any>{
    this.objeto=objeto;
    this.extension='orden/generar';
    return this.http.post<any>(`${this.dominioServidor}${this.extension}`,this.objeto).pipe(catchError(this.handleError('error',[])));
  }

  public postGenerarOrdenCompraPorItem(objeto:any):Observable<any>{
    this.objeto=objeto;
    this.extension='orden';
    return this.http.post<any>(`${this.dominioServidor}${this.extension}`,this.objeto).pipe(catchError(this.handleError('error',[])));
  }
  public getGenerarFactura(objeto:any):Observable<any>{
    this.objeto=objeto;
    this.extension='orden/factura';
    return this.http.post<any>(`${this.dominioServidor}${this.extension}`,this.objeto).pipe(catchError(this.handleError('error',[])));
  }

  public postGenerarBorrarItemOrden(objeto:any):Observable<any>{
    this.objeto=objeto;
    this.extension='orden/actualizar';
    return this.http.post<any>(`${this.dominioServidor}${this.extension}`,this.objeto).pipe(catchError(this.handleError('error',[])));
  }

  public postGenerarCancelarOrden(objeto:any):Observable<any>{
    this.objeto=objeto;
    this.extension='orden/cancelar';
    return this.http.post<any>(`${this.dominioServidor}${this.extension}`,this.objeto).pipe(catchError(this.handleError('error',[])));
  }

  public postGenerarPagoOrden(objeto:any):Observable<any>{
    this.objeto=objeto;
    this.extension='orden/pagar';
    return this.http.post<any>(`${this.dominioServidor}${this.extension}`,this.objeto).pipe(catchError(this.handleError('error',[])));
  }
////////////////////////////////////////////////////////////////////////////////////////////
/** Metodos para LOGING OUT */
  public metodoParaLogOut(){
    localStorage.clear();
  }


/////////////////////////////////////////////////////////////////////////////////////
  private handleError<T>(operation='operation',result?:T){
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
