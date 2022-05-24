import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ProductoOrdenado } from '@pedido/shared/model/producto-ordenado';
import { PedidoService } from '@pedido/shared/service/pedido.service';
import { PedidoMockService } from '@shared/mock/pedido-mock-service';
import { of } from 'rxjs';
import { AgregarProductosComponent } from './agregar-productos.component';

describe('AgregarProductosComponent', () => {
  let component: AgregarProductosComponent;
  let fixture: ComponentFixture<AgregarProductosComponent>;
  let service: PedidoService;
  const pedidoMockService: PedidoMockService = new PedidoMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProductosComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [PedidoService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PedidoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar componente', () => {
    spyOn(service, 'consultarTodosLosProductos').and.returnValue(of(pedidoMockService.crearListadoProductos()));
    component.ngOnInit();
    component.listaProductos.subscribe(response => {
      expect(response.length).toBe(2);
    });
    expect(component.productoSeleccionado).toBeNull();
    expect(component.cantidad).toBe(0);
    expect(component.valor).toBe(0);
  });

  it('Habilitar boton agregar', () => {
    component.productoSeleccionado = pedidoMockService.crearProductoCosmetico();
    component.cantidad = 2;

    let inhabilitar = component.inhabilitarAgregar();
    
    expect(inhabilitar).toBe(false);
    expect(component.cantidad).toBe(2);
  });

  it('Evento Agregar producto', () => {
    component.productoSeleccionado = pedidoMockService.crearProductoPerfume();
    component.cantidad = 4;

    component.notificarProductoOrdenado.subscribe((productoOrdenado: ProductoOrdenado) => {
        expect(productoOrdenado.producto).toBe(component.productoSeleccionado);
        expect(productoOrdenado.cantidad).toBe(component.cantidad);
    });
    
    component.agregarProducto();
  });

  it('Asignar valor al producto seleccionado', () => {
    component.productoSeleccionado = pedidoMockService.crearProductoReloj();
    
    component.asignarValorProducto();

    expect(component.valor).toBe(component.productoSeleccionado.valor);
  });
});
