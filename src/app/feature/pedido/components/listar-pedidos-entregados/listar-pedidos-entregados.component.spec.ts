import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { PedidoService } from '@pedido/shared/service/pedido.service';
import { PedidoMockService } from '@shared/mock/pedido-mock-service';
import { of, throwError } from 'rxjs';
import { ListarPedidosEntregadosComponent } from './listar-pedidos-entregados.component';

describe('ListarPedidosEntregadosComponent', () => {
  let component: ListarPedidosEntregadosComponent;
  let fixture: ComponentFixture<ListarPedidosEntregadosComponent>;
  let service: PedidoService;
  const pedidoMockService: PedidoMockService = new PedidoMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPedidosEntregadosComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [PedidoService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPedidosEntregadosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PedidoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Consultar todos los pedidos entregados', () => {
    spyOn(service, 'consultarTodosLosPedidosEntregados').and.returnValue(of(pedidoMockService.crearListadoPedidosEntregados()));
    component.ngOnInit();
    expect(component.listaPedidosEntregados.length).toBe(3);
  });

  it('Error al consultar todos los pedidos entregados', () => {
    const errorResponse = pedidoMockService.crearHttpRespuestaError501();
    spyOn(service, 'consultarTodosLosPedidosEntregados').and.returnValue(throwError(errorResponse));
    component.ngOnInit();
    expect(component.listaPedidosEntregados).toBeUndefined();
  });
});
