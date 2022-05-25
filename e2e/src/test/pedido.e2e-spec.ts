import { AppPage } from "../app.po";
import { NavbarPage } from "../page/navbar/navbar.po";
import { PedidoPage } from "../page/pedido/pedido.po";
import { browser } from 'protractor';

describe('Page Pedido', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let pedido: PedidoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        pedido = new PedidoPage();

        browser.manage().window().maximize();
        
        page.navigateTo();
        navBar.clickBotonPedido();
    });

    it('Deberia entrar a la opcion de Pedido y comprobar tres opciones de menu', () => {
        
        page.getListTextBySelectorComponentAndTag('app-pedido', 'a.nav-link').then((item) => {
            const subMenuPedido = item.toString().split(',');
            expect(subMenuPedido[0]).toBe('Ordenar');
            expect(subMenuPedido[1]).toBe('Entregar');
            expect(subMenuPedido[2]).toBe('Listar Entregados');
        });
    });

    it('Deberia Ordenar un pedido con dos productos', async () => {
        const NOMBRE_CLIENTE = 'Luna Maria';
        const DIRRECION_ENTREGA = 'Calle 98 # 34a norte 88';
        const MUNICIPIO_ENTREGA = 'Girardota';
        const NOMBRE_PRODUCTO_RELOJ = 'Fossil Nate';
        const CANTIDAD_PRODUCTO_RELOJ = 3;
        const NOMBRE_PRODUCTO_PERFUME = 'Mont Blanc Legend';
        const CANTIDAD_PRODUCTO_PERFUME = 2;
        
        pedido.clickBotonOrdenarPedido();
        expect(page.getTextBySelectorComponentAndTag('app-ordenar-pedido', 'h1')).toEqual('Ordenar Pedido');

        expect(page.getTextBySelectorComponentAndTag('app-ordenar-pedido', '#legend-informacion-entrega')).toEqual('Información de entrega');
        await pedido.seleccionarCliente(NOMBRE_CLIENTE);
        pedido.ingresarDireccion(DIRRECION_ENTREGA);
        pedido.ingresarMunicipio(MUNICIPIO_ENTREGA);

        expect(page.getTextBySelectorComponentAndTag('app-ordenar-pedido', '#legend-agregar-producto')).toEqual('Agregar Productos');
        await pedido.seleccionarProducto(NOMBRE_PRODUCTO_RELOJ);
        pedido.getValueInput('valor').then((value) => {
            expect(value.length).toBeGreaterThan(0);
        });
        pedido.ingresarCantidad(CANTIDAD_PRODUCTO_RELOJ);
        await pedido.clickAgregarProducto(); 

        await pedido.seleccionarProducto(NOMBRE_PRODUCTO_PERFUME);
        pedido.getValueInput('valor').then((value) => {
            expect(value.length).toBeGreaterThan(0);
        });
        pedido.ingresarCantidad(CANTIDAD_PRODUCTO_PERFUME);
        await pedido.clickAgregarProducto();

        expect(page.getTextBySelectorComponentAndTag('app-ordenar-pedido', '#legend-productos-ordenados')).toEqual('Productos Ordenados');
        const cantidadProductosOrdenados = await pedido.contarProductosOrdenados();
        expect(cantidadProductosOrdenados).toEqual(await pedido.contarProductosOrdenados());

        await pedido.moverMouseAElementoByCss('#btn-ordenar-pedido');
        await browser.sleep(2000);
        await pedido.clickOrdenarPedido();

        expect(await pedido.getAlertaExitosa().isPresent()).toEqual(true);
        expect(page.getTitleTextByName('swal2-title')).toEqual('Hecho');

        await pedido.clickOkSuccessAlerta();
    });

    it('Deberia inhabilitar boton de guardar porque no se agregan productos', async () => {
        const NOMBRE_CLIENTE = 'Luna Maria';
        const DIRRECION_ENTREGA = 'Calle 98 # 34a norte 88';
        const MUNICIPIO_ENTREGA = 'Girardota';
        
        pedido.clickBotonOrdenarPedido();
        expect(page.getTextBySelectorComponentAndTag('app-ordenar-pedido', 'h1')).toEqual('Ordenar Pedido');

        expect(page.getTextBySelectorComponentAndTag('app-ordenar-pedido', '#legend-informacion-entrega')).toEqual('Información de entrega');
        await pedido.seleccionarCliente(NOMBRE_CLIENTE);
        pedido.ingresarDireccion(DIRRECION_ENTREGA);
        pedido.ingresarMunicipio(MUNICIPIO_ENTREGA);

        expect(page.getElementById('btn-ordenar-pedido')).toEqual(false);
    });

    it('Deberia entregar pedido', async () => {
        
        const OPCION_PEDIDO_SELECCION = 1;

        pedido.clickBotonEntregarPedido();
        expect(page.getTextBySelectorComponentAndTag('app-entregar-pedido', 'h1')).toEqual('Entregar Pedido');

        expect(page.getTextBySelectorComponentAndTag('app-entregar-pedido', '#legend-pedidos-pendientes')).toEqual('Pedidos Pendientes');
        await pedido.seleccionarPedido(OPCION_PEDIDO_SELECCION);

        expect(page.getTextBySelectorComponentAndTag('app-entregar-pedido', '#legend-pedidos-a-entregar')).toEqual('Pedido A Entregar');

        const cantidadPedidosCargados = await pedido.contarPedidosCargadosEnPanel();
        expect(cantidadPedidosCargados).toEqual(await pedido.contarPedidosCargadosEnPanel());
        
        await pedido.clickEntregarPedido();

        expect(await pedido.getAlertaExitosa().isPresent()).toEqual(true);
        expect(page.getTitleTextByName('swal2-title')).toEqual('Hecho');

        await pedido.clickOkSuccessAlertaByElementName('swal2-confirm');
    });

    it('Deberia listar pedidos entregados', async () => {
        
        pedido.clickBotonListarEntregados();
        expect(page.getTextBySelectorComponentAndTag('app-listar-pedidos-entregados', 'h1')).toEqual('Pedidos Entregados');

        expect(page.getTextBySelectorComponentAndTag('app-listar-pedidos-entregados', '#legend-lista-pedidos')).toEqual('Lista de Pedidos');
        
        expect(await pedido.getAlertaExitosa().isPresent()).toEqual(true);
        expect(await page.getTitleTextByName('swal2-title')).toEqual('Hecho');
        await pedido.clickOkSuccessAlertaByElementName('swal2-confirm');
        
        const cantidadPedidosCargados = await pedido.contarPedidosCargadosEnPanel();
        expect(cantidadPedidosCargados).toEqual(await pedido.contarPedidosCargadosEnPanel());
    });
});