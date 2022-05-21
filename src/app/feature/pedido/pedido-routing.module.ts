import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './components/pedido/pedido.component';
import { OrdenarPedidoComponent } from './components/ordenar-pedido/ordenar-pedido.component';
import { EntregarPedidoComponent } from './components/entregar-pedido/entregar-pedido.component';
import { ListarPedidosEntregadosComponent } from './components/listar-pedidos-entregados/listar-pedidos-entregados.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoComponent,
    children: [
      {
        path: 'ordenar',
        component: OrdenarPedidoComponent
      },
      {
        path: 'entregar',
        component: EntregarPedidoComponent
      },
      {
        path: 'listar/entregados',
        component: ListarPedidosEntregadosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
