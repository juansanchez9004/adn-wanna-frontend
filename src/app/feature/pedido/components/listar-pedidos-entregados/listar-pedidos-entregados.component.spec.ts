import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPedidosEntregadosComponent } from './listar-pedidos-entregados.component';

describe('ListarPedidosEntregadosComponent', () => {
  let component: ListarPedidosEntregadosComponent;
  let fixture: ComponentFixture<ListarPedidosEntregadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPedidosEntregadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPedidosEntregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
