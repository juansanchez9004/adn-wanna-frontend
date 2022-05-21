import { NgModule } from '@angular/core';
import { PedidoRoutingModule } from './pedido-routing.module';
import { EntregarPedidoComponent } from './components/entregar-pedido/entregar-pedido.component';
import { ListarPedidosEntregadosComponent } from './components/listar-pedidos-entregados/listar-pedidos-entregados.component';
import { OrdenarPedidoComponent } from './components/ordenar-pedido/ordenar-pedido.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    EntregarPedidoComponent,
    ListarPedidosEntregadosComponent,
    OrdenarPedidoComponent,
    PedidoComponent
  ],
  imports: [
    PedidoRoutingModule,
    SharedModule
  ]
})
export class PedidoModule { }
