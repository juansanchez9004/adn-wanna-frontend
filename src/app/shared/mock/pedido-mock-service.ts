import { HttpErrorResponse } from "@angular/common/http";
import { ResumenPedido } from "@pedido/shared/model/resumen-pedido";

export class PedidoMockService {
  crearComandoSolicitudOrdenar() {
    return {
      idCliente: 3,
      comandoPuntoEntrega: {
          direccion: "Calle 2 sur # 34 a",
          municipio: "Medellin" 
      },
      comandoProductosOrdenados: [
          { idProducto: 8, cantidad: 2},
          { idProducto: 3, cantidad: 1},
          { idProducto: 5, cantidad: 3}
      ]
    };
  }

  crearListadoClientes() {
    return ([
      {
        id: 1,
        nombre: "Carlos Manuel Lopez"
      },
      {
        id: 2,
        nombre: "Luna Maria Debian"
      },
      {
        id: 3,
        nombre: "Guillermo Celis Mosquera"
      }
    ]);
  }

  crearListadoProductos() {
    return ([
      {
        id: 1,
        nombre: "Mont Blanc Legend Eau de Parfum",
        tipoProducto: "PERFUME",
        valor: 480500.00
      },
      {
        id: 2,
        nombre: "Casio Retro Iconic Dorado",
        tipoProducto: "RELOJ",
        valor: 650000.00
      }
    ]);
  }

  crearListadoPedidosPendientes() {
    return ([
      {
        id: 3,
        fecha: "2022-05-16",
        sitioEntrega: "Calle 90 c # 584 - Envigado",
        valorTotal: 1071525.00,
        estado: "PENDIENTE"
      },
      {
        id: 6,
        fecha: "2022-05-16",
        sitioEntrega: "Diagonal 40 a 35 # 68 - Caldas",
        valorTotal: 2934890.00,
        estado: "PENDIENTE"
      },
      {
        id: 9,
        fecha: "2022-05-16",
        sitioEntrega: "Calle 40 a su ee - Sabaneta",
        valorTotal: 1233980.00,
        estado: "PENDIENTE"
      },
      {
        id: 19,
        fecha: "2022-05-23",
        sitioEntrega: "Calle 90 - La Estrella",
        valorTotal: 1851070.00,
        estado: "PENDIENTE"
      }
    ]);
  }

  crearListadoPedidosEntregados() {
    return ([
      {
        id: 1,
        fecha: "2022-05-16",
        sitioEntrega: "Calle 35 # 42 - 46 - Itagui",
        valorTotal: 1268960.00,
        estado: "ENTREGADO"
      },
      {
        id: 2,
        fecha: "2022-05-16",
        sitioEntrega: "Diagonal 54 a # 14 - 5 - Medellin",
        valorTotal: 1839500.00,
        estado: "ENTREGADO"
      },
      {
        id: 4,
        fecha: "2022-05-16",
        sitioEntrega: "Cra 60 dd # 42 - Barbosa",
        valorTotal: 477520.00,
        estado: "ENTREGADO"
      }
    ]);
  }

  crearHttpRespuestaError501() {
    return new HttpErrorResponse({
      error: 'test 501 error',
      status: 501,
      statusText: 'Internal Server Error'
    });
  }

  crearResumenPedidoPendiente() {
    return new ResumenPedido(10, '2022-05-15', 'Calle 34 # 12', 125000, 'PENDIENTE');
  }

  crearProductoCosmetico() {
    return {
      id: 5,
      nombre: "Kit Plantilla Maquillaje Cosmetico Delineador Cejas",
      tipoProducto: "COSMETICO",
      valor: 15000.00
    };
  }

  crearProductoReloj() {
    return {
      id: 3,
      nombre: "Fossil RT 6",
      tipoProducto: "RELOJ",
      valor: 458000.00
    };
  }

  crearProductoPerfume() {
    return {
      id: 8,
      nombre: "Amber Out Edition Gold",
      tipoProducto: "PERFUME",
      valor: 325000.00
    };
  }

  crearProductoOrdenado() {
    return {
      id: 14,
      producto: this.crearProductoCosmetico(),
      cantidad: 1,
      valor: 15000.00
    };
  }

  crearListadoProductosOrdenados() {
    return ([
      {
        id: 12,
        producto: this.crearProductoPerfume(),
        cantidad: 2,
        valor: 650000.00
      },
      {
        id: 13,
        producto: this.crearProductoReloj(),
        cantidad: 1,
        valor: 458000.00
      },
      {
        id: 14,
        producto: this.crearProductoCosmetico(),
        cantidad: 3,
        valor: 45000.00
      }
    ]);
  }
}