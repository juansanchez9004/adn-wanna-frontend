import { ComandoPuntoEntrega } from './comando-punto-entrega';
import { ComandoProductoOrdenar } from './comando-producto-ordenar';

export class ComandoSolicitudOrdenar {

    idCliente: number;
    
    fecha?: Date;

    comandoPuntoEntrega: ComandoPuntoEntrega;

    comandoProductosOrdenados: ComandoProductoOrdenar[];

    constructor(idCliente: number, comandoPuntoEntrega: ComandoPuntoEntrega, 
                comandoProductosOrdenados: ComandoProductoOrdenar[]) {
            this.idCliente = idCliente;
            this.comandoPuntoEntrega = comandoPuntoEntrega;
            this.comandoProductosOrdenados = comandoProductosOrdenados;
    }
}