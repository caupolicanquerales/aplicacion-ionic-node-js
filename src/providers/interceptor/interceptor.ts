import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/* Clase tipo Provider en IONIC y en ANGULAR es una CLASS tipo SERVICE, para actuar como
  un HTTP INTERCEPTOR  */

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor() {
  }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

    const token= localStorage.getItem("token");//recupera del "LOCAL STORAGE" el valor del TOKEN
    if(token){
        //establece el HEADER del envio con el valor del TOKEN y la palabra "BEARER"
        const cloned= req.clone({
            headers:req.headers.set("authorization","Bearer "+token)
        });

        console.log('respuesta positiva',cloned,token);

        return next.handle(cloned);//ordena la siguiente ejecucion del MIDDLEWARE

    }else{
        console.log('respuesta negativa',req);
        return next.handle(req); //regresa el valor de respuesta
    }
}

}
