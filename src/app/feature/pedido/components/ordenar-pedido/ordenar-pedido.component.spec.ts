import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenarPedidoComponent } from './ordenar-pedido.component';

describe('OrdenarPedidoComponent', () => {
  let component: OrdenarPedidoComponent;
  let fixture: ComponentFixture<OrdenarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
