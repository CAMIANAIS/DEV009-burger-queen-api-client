import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { LoginMatcher } from '../shared/interfaces/login.interface';
import { Router } from '@angular/router';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, Router], // Agregue Router a los providers
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a login request', () => {
    const email = 'test@example.com';
    const password = 'password';

    const mockResponse: LoginMatcher = {
        accessToken: 'token_de_prueba',
        user: {
          id: '1',
          email: 'correo@ejemplo.com',
          role: 'usuario',
        }
      };
      
      

    service.login(email, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });

    req.flush(mockResponse);
  });

  it('should clear localStorage and navigate to /login on logout', () => {
    spyOn(localStorage, 'clear').and.callFake(() => {}); // Espíe localStorage.clear
    spyOn(service['router'], 'navigate'); 

    service.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(service['router'].navigate).toHaveBeenCalledWith(['/login']);
  });
});
