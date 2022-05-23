import { Producto } from './producto';

export class ProductoOrdenado {

    id: number;

    producto: Producto;

    cantidad: number;

    valor: number;

    constructor(producto: Producto, cantidad: number, valor: number) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.valor = valor;
    }
}