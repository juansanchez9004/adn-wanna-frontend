import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { PedidoService } from '@pedido/shared/service/pedido.service';
import { PedidoMockService } from '@shared/mock/pedido-mock-service';
import { of, throwError, Observable } from 'rxjs';
import { EntregarPedidoComponent } from './entregar-pedido.component';

describe('EntregarPedidoComponent', () => {
  let component: EntregarPedidoComponent;
  let fixture: ComponentFixture<EntregarPedidoComponent>;
  let service: PedidoService;
  const pedidoMockService: PedidoMockService = new PedidoMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregarPedidoComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [PedidoService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregarPedidoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PedidoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar componente', () => {
    spyOn(service, 'consultarTodosLosPedidosPendientes').and.returnValue(of(pedidoMockService.crearListadoPedidosPendientes()));
    component.ngOnInit();
    component.listaPedidosPendientes.subscribe(response => {
      expect(response.length).toBe(4);
    });
    expect(component.pedidoAEntregar).toBeNull();
  });

  it('Error al entregar pedido', () => {
    const pedidoAEntregar = pedidoMockService.crearResumenPedidoPendiente();
    const errorResponse = pedidoMockService.crearHttpRespuestaError501();
    spyOn(service, 'entregarPedido').withArgs(pedidoAEntregar.id).and.returnValue(throwError(errorResponse));
    spyOn(service, 'consultarTodosLosPedidosPendientes').and.returnValue(of(null));
    component.pedidoAEntregar = pedidoAEntregar;
    component.entregarPedido();
    expect(component.listaPedidosPendientes).toBeInstanceOf(Observable);
    expect(component.pedidoAEntregar).toBeNull();
    component.listaPedidosPendientes.subscribe(response => {
      expect(response).toBeNull();
    });
  });

   it('Entregar pedido exitosamente', () => {
    const pedidoAEntregar = pedidoMockService.crearResumenPedidoPendiente();
    component.pedidoAEntregar = pedidoMockService.crearResumenPedidoPendiente();
    spyOn(service, 'entregarPedido').withArgs(pedidoAEntregar.id).and.returnValue(of(void 0));
    spyOn(service, 'consultarTodosLosPedidosPendientes').and.returnValue(of(pedidoMockService.crearListadoPedidosPendientes()));
    component.entregarPedido();
    component.listaPedidosPendientes.subscribe(response => {
      expect(response.length).toBe(4);
    });
    expect(component.pedidoAEntregar).toBeNull();
  });
});
