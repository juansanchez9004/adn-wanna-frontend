
export class ResumenPedido {

    id: number;
    fecha: string;
    sitioEntrega: string;
    valorTotal: number;
    estado: string;

    constructor(id: number, fecha: string, sitioEntrega: string, valorTotal: number, estado: string) {
        this.id = id;
        this.fecha = fecha;
        this.sitioEntrega = sitioEntrega;
        this.valorTotal = valorTotal;
        this.estado = estado;
    }
}