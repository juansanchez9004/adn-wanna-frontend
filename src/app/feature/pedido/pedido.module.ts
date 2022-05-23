import { NgModule } from '@angular/core';
import { PedidoRoutingModule } from './pedido-routing.module';
import { EntregarPedidoComponent } from './components/entregar-pedido/entregar-pedido.component';
import { ListarPedidosEntregadosComponent } from './components/listar-pedidos-entregados/listar-pedidos-entregados.component';
import { OrdenarPedidoComponent } from './components/ordenar-pedido/ordenar-pedido.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { SharedModule } from '@shared/shared.module';
import { PedidoService } from './shared/service/pedido.service';
import { AgregarProductosComponent } from './components/ordenar-pedido/agregar-productos/agregar-productos.component';
import { InformacionPedidoComponent } from './components/informacion-pedido/informacion-pedido.component';

@NgModule({
  declarations: [
    EntregarPedidoComponent,
    ListarPedidosEntregadosComponent,
    OrdenarPedidoComponent,
    PedidoComponent,
    AgregarProductosComponent,
    InformacionPedidoComponent
  ],
  imports: [
    PedidoRoutingModule,
    SharedModule
  ],
  providers: [PedidoService]
})
export class PedidoModule { }
