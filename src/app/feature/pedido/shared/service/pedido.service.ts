import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';

import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';
import { Producto } from '../model/producto';
import { ComandoSolicitudOrdenar } from '../model/comando-solicitud-ordenar';

@Injectable()
export class PedidoService {

  constructor(protected http: HttpService) {}

  public crearOrden(comandoSolicitudOrdenar: ComandoSolicitudOrdenar) {
    return this.http.doPost<ComandoSolicitudOrdenar, number>(`${environment.endpoint}/pedido`, comandoSolicitudOrdenar,
                                            this.http.optsName('crear/ pedidos'));
  }

  public consultarTodosLosClientes() {
    return this.http.doGet<Cliente[]>(`${environment.endpoint}/cliente/todos`, this.http.optsName('consultar todos los clientes'));
  }

  public consultarTodosLosProductos() {
    return this.http.doGet<Producto[]>(`${environment.endpoint}/producto/todos`, this.http.optsName('consultar todos los productos'));
  }

  /*
  public consultarEntregados() {

  }

  public consultarEntregados() {

  }*/
}
