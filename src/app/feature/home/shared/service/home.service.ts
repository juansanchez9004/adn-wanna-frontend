import { Injectable } from '@angular/core';
import { Options, HttpService } from '@core-service/http.service';
import { HttpParams } from '@angular/common/http';
import { RespuestaServicioTRM } from '../model/respuesta-servicio-trm';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  urlData: string = './assets/data.json';

  constructor(protected http: HttpService) { }

  public consultarTRM(fechaActualTRM: string) {
    let parametros = new HttpParams().set('date', fechaActualTRM);
    let optiones: Options = {
      params: parametros
    };
    return this.http.doGet<RespuestaServicioTRM>(`${this.urlData}`, optiones);
  }
}
