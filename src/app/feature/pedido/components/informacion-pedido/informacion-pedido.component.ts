import { Component, Input, OnInit } from '@angular/core';
import { ResumenPedido } from '../../shared/model/resumen-pedido';

@Component({
  selector: 'app-informacion-pedido',
  templateUrl: './informacion-pedido.component.html',
  styleUrls: ['./informacion-pedido.component.css']
})
export class InformacionPedidoComponent implements OnInit {

  @Input() pedidoResumen: ResumenPedido;
  @Input() estadoPedido: string;
  @Input() color: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.color = (this.color === undefined ? 'danger' : this.color);
  }
}
