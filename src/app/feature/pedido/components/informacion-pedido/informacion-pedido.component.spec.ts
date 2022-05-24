import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InformacionPedidoComponent } from './informacion-pedido.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PedidoMockService } from '@shared/mock/pedido-mock-service';

describe('InformacionPedidoComponent', () => {
  let component: InformacionPedidoComponent;
  let fixture: ComponentFixture<InformacionPedidoComponent>;
  const pedidoMockService: PedidoMockService = new PedidoMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionPedidoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPedidoComponent);
    component = fixture.componentInstance;
    component.color = 'warning';
    component.estadoPedido = 'PENDIENTE';
    component.pedidoResumen = pedidoMockService.crearResumenPedidoPendiente();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('iniciar componente', () => {
    const informacionPedidoComponent = new InformacionPedidoComponent();
    informacionPedidoComponent.estadoPedido = 'PENDIENTE';
    informacionPedidoComponent.pedidoResumen = pedidoMockService.crearResumenPedidoPendiente();
    informacionPedidoComponent.ngOnInit();
    expect(informacionPedidoComponent.color).toBe('danger');
    expect(informacionPedidoComponent.estadoPedido).toBe('PENDIENTE');
  });
});
