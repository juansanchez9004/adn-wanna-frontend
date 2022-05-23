export class Producto {

    id: number;
    nombre: string;
    tipoProducto: string;
    valor: number;

    constructor(id: number, nombre: string, tipoProducto: string, valor: number) {
        this.id = id;
        this.nombre = nombre;
        this.tipoProducto = tipoProducto;
        this.valor = valor;
    }
}