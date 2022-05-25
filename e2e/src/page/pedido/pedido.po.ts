import { by, element, browser } from 'protractor';

export class PedidoPage {
    
    private linkOrdenarPedido = element(by.id('linkOrdenarPedido'));
    private linkEntregarPedido = element(by.id('linkEntregarPedido'));
    private linkListarEntregados = element(by.id('linkListarEntregados'));

    private selectClientes = element(by.id('cliente'));
    private inputDireccion = element(by.id('direccion'));
    private inputMunicipio = element(by.id('municipio'));

    private selectProductos = element(by.id('producto'));
    private inputValor = element(by.id('valor'));
    private inputCantidad = element(by.id('cantidad'));
    private btnAgregarProducto = element(by.id('btn-agregar-producto'));
    
    private btnEliminarProductoOrdenado = element(by.id('btn-eliminar-producto-ordenado'));
    private btnOrdenarPedido = element(by.id('btn-ordenar-pedido'));
    
    private selectPedidos = element(by.id('pedido'));

    private btnEntregarPedido = element(by.id('btn-entregar-pedido'));

    private btnOkSuccessAlerta = element(by.className('swal2-confirm'));
    private successAlerta = element(by.className('swal2-icon-success'));

    async clickBotonOrdenarPedido() {
        await this.linkOrdenarPedido.click();
    }

    async clickBotonEntregarPedido() {
        await this.linkEntregarPedido.click();
    }

    async clickBotonListarEntregados() {
        await this.linkListarEntregados.click();
    }

    clickAgregarProducto() {
        return this.btnAgregarProducto.click();
    }

    clickEliminarProductoOrdenado() {
        return this.btnEliminarProductoOrdenado.click();
    }

    clickOrdenarPedido() {
        return this.btnOrdenarPedido.click();
    }

    clickEntregarPedido() {
        return this.btnEntregarPedido.click();
    }

    clickOkSuccessAlerta() {
        return this.btnOkSuccessAlerta.click();
    }
    
    async ingresarDireccion(direccionEntrega: string) {
        this.inputDireccion.clear();
        await this.inputDireccion.sendKeys(direccionEntrega);
    }

    async ingresarMunicipio(municipioEntrega: string) {
        this.inputMunicipio.clear();
        await this.inputMunicipio.sendKeys(municipioEntrega);
    }

    async ingresarValor(valor: number) {
        this.inputValor.clear();
        await this.inputValor.sendKeys(valor);
    }

    async ingresarCantidad(cantidad: number) {
        this.inputCantidad.clear();
        await this.inputCantidad.sendKeys(cantidad);
    }

    async seleccionarCliente(optionText: string) {
        await this.selectClientes.click();
        await element(by.cssContainingText('option', optionText)).click();
    }

    async seleccionarProducto(optionText: string) {
        await this.selectProductos.click();
        await element(by.cssContainingText('option', optionText)).click();
    }

    async seleccionarPedido(numberOption: number) {
        await this.selectPedidos.click();

        await this.selectPedidos.all(by.tagName('option')).then( opt => {
            opt[numberOption].click();
        });
    }

    async contarProductosOrdenados() {
        return element.all(by.css('app-ordenar-pedido .contenedor-producto-ordenado')).count();
    }

    async getValueInput(idSelector: string) {
        return element(by.id(idSelector)).getAttribute('value');
    }

    async moverMouseAElementoByCss(selectorElemento: string) {
        const elemento = await browser.findElement(by.css(selectorElemento));
        await browser.actions().mouseMove(elemento).perform();
    }

    getAlertaExitosa() {
        return this.successAlerta;
    }

    async contarPedidosCargadosEnPanel() {
        return element.all(by.css('app-entregar-pedido ul.list-group')).count();
    }
}