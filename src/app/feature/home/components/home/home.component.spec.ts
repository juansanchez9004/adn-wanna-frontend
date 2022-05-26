import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { HomeService } from '../../shared/service/home.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeMockService } from '@shared/mock/home-mock-service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: HomeService;
  const homeMockService: HomeMockService = new HomeMockService();

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [HomeService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar componente', () => {

    let fechaActualTRM = component.obtenerFechaActualTRM();
    let respuestaServicioTRM = homeMockService.crearRespuestaAPITRM();

    spyOn(service, 'consultarTRM').withArgs(fechaActualTRM).and.returnValue(of(respuestaServicioTRM));
    component.ngOnInit();
    
    expect(component.trm.unit).toEqual(respuestaServicioTRM.data.unit);
    expect(component.trm.validityFrom).toEqual(respuestaServicioTRM.data.validityFrom);
    expect(component.trm.validityTo).toEqual(respuestaServicioTRM.data.validityTo);
  });

  it('Obtener TRM', () => {
    
    let fechaActualTRM = component.obtenerFechaActualTRM();
    let respuestaServicioTRM = homeMockService.crearRespuestaAPITRM();

    spyOn(service, 'consultarTRM').withArgs(fechaActualTRM).and.returnValue(of(respuestaServicioTRM));
    
    component.obtenerTRM();
  
    expect(component.trm.value).toEqual(respuestaServicioTRM.data.value);
    expect(component.trm.success).toEqual(true);
  });
});
