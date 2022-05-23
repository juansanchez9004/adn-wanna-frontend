import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PedidoService } from '@pedido/shared/service/pedido.service';
import { Observable } from 'rxjs';
import { Cliente } from '@pedido/shared/model/cliente';
import { ProductoOrdenado } from '@pedido/shared/model/producto-ordenado';
import { ComandoPuntoEntrega } from '@pedido/shared/model/comando-punto-entrega';
import { ComandoProductoOrdenar } from '@pedido/shared/model/comando-producto-ordenar';
import { ComandoSolicitudOrdenar } from '@pedido/shared/model/comando-solicitud-ordenar';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 5;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 40;

@Component({
  selector: 'app-ordenar-pedido',
  templateUrl: './ordenar-pedido.component.html',
  styleUrls: ['./ordenar-pedido.component.css']
})
export class OrdenarPedidoComponent implements OnInit {
  
  public listaClientes: Observable<Cliente[]>;

  pedidoForm: FormGroup;

  listaProductosOrdenados: ProductoOrdenado[];

  constructor(protected pedidoService :PedidoService) { }

  ngOnInit() {
    this.listaClientes = this.pedidoService.consultarTodosLosClientes();
    this.listaProductosOrdenados = [];
    this.construirFormularioPedido();
  }

  ordenarPedido() {
    const comandoSolicitudOrdenar: ComandoSolicitudOrdenar = this.crearComandoSolicitudOrdenar();

    this.pedidoService.crearOrden(comandoSolicitudOrdenar).subscribe(response => {
      if (response[`valor`] !== undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Hecho',
          text: 'Su pedido se ha creado exitosamente.',
          showConfirmButton: true,
          timer: 5000
        });

        this.inicializarPedido();
      }
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: `Se ha generado un error. ${error.error.mensaje}`,
        showConfirmButton: true,
        timer: 5000
      });

      this.inicializarPedido();
    });
  }

  private construirFormularioPedido() {
    this.pedidoForm = new FormGroup({
      cliente: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required, 
                                      Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      municipio: new FormControl('', [Validators.required, 
                                      Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])                                                      
    });
  }

  eventoProductoOrdenado(productoOrdenado: ProductoOrdenado) {
    this.agregarProductoOrdenado(productoOrdenado);
  }

  private agregarProductoOrdenado(productoOrdenado: ProductoOrdenado) {
    const indexProductoOrdenado = this.listaProductosOrdenados.findIndex(item => item.producto.id === productoOrdenado.producto.id);

    if(indexProductoOrdenado < 0) {
      this.listaProductosOrdenados.push(productoOrdenado);
    } else {
      this.listaProductosOrdenados.splice(indexProductoOrdenado, 1, productoOrdenado);
    }
  }

  eliminarProductoOrdenado(productoOrdenado: ProductoOrdenado) {
    const indexProductoOrdenado = this.listaProductosOrdenados.findIndex(item => item.producto.id === productoOrdenado.producto.id);
    this.listaProductosOrdenados.splice(indexProductoOrdenado, 1);
  }

  private crearComandoSolicitudOrdenar(): ComandoSolicitudOrdenar {
    return new ComandoSolicitudOrdenar(this.pedidoForm.get('cliente').value,
          this.crearComandoPuntoEntrega(), this.crearComandoProductosOrdenar());
  }

  private crearComandoPuntoEntrega(): ComandoPuntoEntrega {
    return new ComandoPuntoEntrega(this.pedidoForm.get('direccion').value, this.pedidoForm.get('municipio').value);
  }

  private crearComandoProductosOrdenar(): ComandoProductoOrdenar[] {
    const comandoProductosOrdenar: ComandoProductoOrdenar[] = this.listaProductosOrdenados.map((item) => {
      return new ComandoProductoOrdenar(item.producto.id,  item.cantidad);
    });
    return comandoProductosOrdenar;
  }

  private inicializarPedido() {
    this.listaProductosOrdenados = [];
    this.pedidoForm.reset();
  }
}
