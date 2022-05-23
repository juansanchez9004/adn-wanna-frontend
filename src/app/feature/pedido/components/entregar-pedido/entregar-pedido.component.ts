import { Component, OnInit } from '@angular/core';
import { ResumenPedido } from '../../shared/model/resumen-pedido';
import { Observable } from 'rxjs';
import { PedidoService } from '../../shared/service/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entregar-pedido',
  templateUrl: './entregar-pedido.component.html',
  styleUrls: ['./entregar-pedido.component.css']
})
export class EntregarPedidoComponent implements OnInit {

  listaPedidosPendientes: Observable<ResumenPedido[]>;
  pedidoAEntregar: ResumenPedido;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.limpiarComponente();
  }

  entregarPedido() {
    this.pedidoService.entregarPedido(this.pedidoAEntregar.id).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Hecho',
          text: 'El pedido ha sido entregado exitosamente.',
          showConfirmButton: true,
          timer: 5000
        });

        this.limpiarComponente();
    }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: `Se ha generado un error. ${error.error.mensaje}`,
          showConfirmButton: true,
          timer: 5000
        });

        this.limpiarComponente();
    });
  }

  private limpiarComponente() {
    this.pedidoAEntregar = null;
    this.listaPedidosPendientes = this.pedidoService.consultarTodosLosPedidosPendientes();
  }
}
