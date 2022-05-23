export class ComandoProductoOrdenar {

    idProducto: number;
    
    cantidad: number;

    constructor(idProducto: number, cantidad: number) {
            this.idProducto = idProducto;
            this.cantidad = cantidad;
    }
}