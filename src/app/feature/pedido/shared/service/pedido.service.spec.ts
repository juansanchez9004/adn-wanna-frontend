import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { PedidoService } from './pedido.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PedidoMockService } from '../../../../shared/mock/pedido-mock-service';
import { HttpResponse } from '@angular/common/http';

describe('PedidoService', () => {
  let httpMock: HttpTestingController;
  let service: PedidoService;
  const pedidoMockService: PedidoMockService = new PedidoMockService();

  const apiEndpointCrearOrden = `${environment.endpoint}/pedido`;
  const apiEndpointConsultarTodosLosClientes = `${environment.endpoint}/cliente/todos`;
  const apiEndpointConsultarTodosLosProductos = `${environment.endpoint}/producto/todos`;
  const apiEndpointConsultarTodosLosPedidosPendientes = `${environment.endpoint}/pedido/pendientes`;
  const apiEndpointEntregarPedido = `${environment.endpoint}/pedido/entregar/2`;
  const apiEndpointPedidosEntregados = `${environment.endpoint}/pedido/entregados`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PedidoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(PedidoService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const pedidoService: PedidoService = TestBed.inject(PedidoService);
    expect(pedidoService).toBeTruthy();
  });

  it('deberia crear un pedido', () => {
    const dummyPedido = pedidoMockService.crearComandoSolicitudOrdenar();
    
    service.crearOrden(dummyPedido).subscribe((response) => {
      expect(response).toBe(10);
    });

    const req = httpMock.expectOne(apiEndpointCrearOrden);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({ body: 10 }));
  });

  it('deberia consultar todos los clientes', () => {

    const dummyClientes = pedidoMockService.crearListadoClientes();
    
    service.consultarTodosLosClientes().subscribe(response => {
      expect(response.length).toBe(3);
      expect(response).toBe(dummyClientes);
    });

    const req = httpMock.expectOne(apiEndpointConsultarTodosLosClientes);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClientes);
  });

  it('deberia consultar todos los productos', () => {

    const dummyProductos = pedidoMockService.crearListadoProductos();
    
    service.consultarTodosLosProductos().subscribe(response => {
      expect(response.length).toBe(2);
      expect(response).toBe(dummyProductos);
    });

    const req = httpMock.expectOne(apiEndpointConsultarTodosLosProductos);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });

  it('deberia consultar todos los pedidos pendientes', () => {

    const dummyPedidosPendientes = pedidoMockService.crearListadoPedidosPendientes();
    
    service.consultarTodosLosPedidosPendientes().subscribe(response => {
      expect(response.length).toBe(4);
      expect(response).toBe(dummyPedidosPendientes);
    });

    const req = httpMock.expectOne(apiEndpointConsultarTodosLosPedidosPendientes);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPedidosPendientes);
  });

  it('deberia entregar un pedido', () => {
    const dummyIdPedido = 2;
    
    service.entregarPedido(dummyIdPedido).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(apiEndpointEntregarPedido);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({ body: null }));
  });

  it('deberia consultar todos los pedidos entregados', () => {

    const dummyPedidosEntregados = pedidoMockService.crearListadoPedidosEntregados();
    
    service.consultarTodosLosPedidosEntregados().subscribe(response => {
      expect(response.length).toBe(3);
      expect(response).toBe(dummyPedidosEntregados);
    });

    const req = httpMock.expectOne(apiEndpointPedidosEntregados);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPedidosEntregados);
  });  
});
