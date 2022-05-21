import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregarPedidoComponent } from './entregar-pedido.component';

describe('EntregarPedidoComponent', () => {
  let component: EntregarPedidoComponent;
  let fixture: ComponentFixture<EntregarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
