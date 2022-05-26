import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { HomeMockService } from '@shared/mock/home-mock-service';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let httpMock: HttpTestingController;
  let service: HomeService;
  const homeMockService: HomeMockService = new HomeMockService();

  const apiEndpointConsultarTRM = `./assets/data.json?date=2022-05-25`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(HomeService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const homeService: HomeService = TestBed.inject(HomeService);
    expect(homeService).toBeTruthy();
  });

  it('deberia consultar el TRM', () => {

    const fechaTRM = '2022-05-25';
    const dummyRespuestaTRM = homeMockService.crearRespuestaAPITRM();
    
    service.consultarTRM(fechaTRM).subscribe(response => {
      expect(response).toBe(dummyRespuestaTRM);
    });

    const req = httpMock.expectOne(apiEndpointConsultarTRM);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRespuestaTRM);
  });
});
