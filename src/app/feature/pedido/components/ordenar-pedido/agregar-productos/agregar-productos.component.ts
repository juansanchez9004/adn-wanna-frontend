import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '@pedido/shared/model/producto';
import { PedidoService } from '@pedido/shared/service/pedido.service';
import { ProductoOrdenado } from '@pedido/shared/model/producto-ordenado';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {

  @Output() notificarProductoOrdenado = new EventEmitter();

  listaProductos: Observable<Producto[]>;
  productoSeleccionado: Producto;
  cantidad: number;
  valor: number;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.listaProductos = this.pedidoService.consultarTodosLosProductos();
    this.productoSeleccionado = null;
    this.cantidad = 0;
    this.valor = 0;
  }

  inhabilitarAgregar() {
    if(this.hayProductoSeleccionado() && this.hayCantidadPermitida()) {
      return false;
    } else {
      return true;
    }
  }

  private hayProductoSeleccionado() {
    return this.productoSeleccionado != null;
  }

  private hayCantidadPermitida() {
    return (this.cantidad != null && this.cantidad > 0);
  }

  agregarProducto() {
    this.notificarProductoOrdenado.emit(this.crearProductoOrdenado());
    this.limpiarPanelAgregarProducto();
  }

  private crearProductoOrdenado():ProductoOrdenado {
    const valorProductoOrdenado = (this.productoSeleccionado.valor * this.cantidad);
    return new ProductoOrdenado(this.productoSeleccionado, this.cantidad, valorProductoOrdenado);
  }

  private limpiarPanelAgregarProducto() {
    this.productoSeleccionado = null;
    this.cantidad = 0;
    this.valor = 0;
  }

  asignarValorProducto() {
    this.valor = this.productoSeleccionado.valor;
  }
}
