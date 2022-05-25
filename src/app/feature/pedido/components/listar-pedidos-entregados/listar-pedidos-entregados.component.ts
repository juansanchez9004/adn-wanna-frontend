import { Component, OnInit } from '@angular/core';
import { ResumenPedido } from '../../shared/model/resumen-pedido';
import { PedidoService } from '../../shared/service/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-pedidos-entregados',
  templateUrl: './listar-pedidos-entregados.component.html',
  styleUrls: ['./listar-pedidos-entregados.component.css']
})
export class ListarPedidosEntregadosComponent implements OnInit {

  listaPedidosEntregados: ResumenPedido[];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.consultarTodosLosPedidosEntregados().subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Hecho',
          text: 'Los pedidos entregados se han cargado exitosamente.',
          showConfirmButton: true,
          timer: 3000
        });

        this.listaPedidosEntregados = response;
    }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: `Se ha generado un error. ${error.error.mensaje}`,
          showConfirmButton: true,
          timer: 3000
        });
    });
  }

}
