import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ComandoSolicitudOrdenar } from '@pedido/shared/model/comando-solicitud-ordenar';
import { PedidoService } from '@pedido/shared/service/pedido.service';
import { PedidoMockService } from '@shared/mock/pedido-mock-service';
import { of, throwError } from 'rxjs';
import { OrdenarPedidoComponent } from './ordenar-pedido.component';

describe('OrdenarPedidoComponent', () => {
  let component: OrdenarPedidoComponent;
  let fixture: ComponentFixture<OrdenarPedidoComponent>;
  let service: PedidoService;
  const pedidoMockService: PedidoMockService = new PedidoMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenarPedidoComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [PedidoService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenarPedidoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PedidoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar componente', () => {
    spyOn(service, 'consultarTodosLosClientes').and.returnValue(of(pedidoMockService.crearListadoClientes()));
    component.ngOnInit();
    component.listaClientes.subscribe(response => {
      expect(response.length).toBe(3);
    });
    expect(component.listaProductosOrdenados).toEqual([]);
  });

  it('Evento agregar producto ordenado', () => {
    const productoOrdenado = pedidoMockService.crearProductoOrdenado();
    component.eventoProductoOrdenado(productoOrdenado as any);
    
    expect(component.listaProductosOrdenados.length).toEqual(1);
  });

  it('Evento actualizar producto ordenado', () => {
    const productoOrdenado = pedidoMockService.crearProductoOrdenado();
    component.listaProductosOrdenados = (pedidoMockService.crearListadoProductosOrdenados() as any);

    component.eventoProductoOrdenado(productoOrdenado as any);
    
    expect(component.listaProductosOrdenados.length).toEqual(3);
  });

  it('Eliminar producto ordenado de la lista', () => {
    const productoOrdenado = pedidoMockService.crearProductoOrdenado();
    component.listaProductosOrdenados = (pedidoMockService.crearListadoProductosOrdenados() as any);

    component.eliminarProductoOrdenado(productoOrdenado as any);
    
    expect(component.listaProductosOrdenados.length).toEqual(2);
  });

  it('Error al ordenar pedido', () => {
    const errorResponse = pedidoMockService.crearHttpRespuestaError501();
    
    spyOn(service, 'crearOrden').and.returnValue(throwError(errorResponse));
    
    component.ordenarPedido();

    expect(component.listaProductosOrdenados).toEqual([]);
  });

  it('Ordenar pedido exitosamente', () => {
    
    component.listaProductosOrdenados = (pedidoMockService.crearListadoProductosOrdenados());
    component.listaClientes = of(pedidoMockService.crearListadoClientes());
    
    component.pedidoForm.controls.cliente.setValue(3);
    component.pedidoForm.controls.direccion.setValue('Calle 2 sur # 34 a');
    component.pedidoForm.controls.municipio.setValue('Medellin');

    expect(component.pedidoForm.valid).toBeTruthy();

    component.ordenarPedido();
    
    expect(component.listaProductosOrdenados.length).toEqual(3);
    expect(component.pedidoForm.get('direccion').value).toBe('Calle 2 sur # 34 a');
    expect(component.pedidoForm.get('municipio').value).toBe('Medellin');
  });

  it('Ordenar pedido exitosamente', () => {
    const comandoSolicitud : ComandoSolicitudOrdenar = pedidoMockService.crearComandoSolicitudOrdenar();
    
    spyOn(service, 'crearOrden').withArgs(comandoSolicitud).and.returnValue(of(10));
    
    component.listaProductosOrdenados = (pedidoMockService.crearListadoProductosOrdenados());
    component.listaClientes = of(pedidoMockService.crearListadoClientes());
    
    component.pedidoForm.controls.cliente.setValue(3);
    component.pedidoForm.controls.direccion.setValue('Calle 2 sur # 34 a');
    component.pedidoForm.controls.municipio.setValue('Medellin');

    expect(component.pedidoForm.valid).toBeTruthy();

    component.crearPedido(comandoSolicitud);
    
    expect(component.listaProductosOrdenados.length).toEqual(3);
  });
});
