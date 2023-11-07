import { TestBed } from '@angular/core/testing';
import { UsersService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { userData } from '../shared/interfaces/userData.interface';

describe('UsersService', () => {
  let usersService: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    usersService = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  it('should retrieve users from the API via GET', () => {
    const mockUsers: userData[] = [
      {
        id: 1,
        email: 'admin@systers.xyz',
        password: '123456',
        role: 'admin'
      }
    ];

    usersService.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('https://burger-queen-api-mock-r1iq.onrender.com/users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

  it('should add a new user via POST', () => {
    const newUser: userData = {
      id: 1,
      email: 'correo@ejemplo.com',
      password: '123456',
      role: 'usuario',
    };

    usersService.postUser(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
    });

    const req = httpTestingController.expectOne('https://burger-queen-api-mock-r1iq.onrender.com/users');
    expect(req.request.method).toEqual('POST');
    req.flush(newUser);
  });

  it('should update an existing user via PATCH', () => {
    const userId = '1';
    const updatedUser: userData = {
      id: 1,
      email: 'correo@ejemplo.com',
      password: '123456',
      role: 'chef',
    };
  
    // Realiza la solicitud PATCH
    usersService.patchUser(userId, updatedUser).subscribe((user) => {
      expect(user).toEqual(updatedUser);
    });
  
    // Espera una solicitud PATCH al servidor
    const req = httpTestingController.expectOne(`https://burger-queen-api-mock-r1iq.onrender.com/users/${userId}`);
    expect(req.request.method).toEqual('PATCH');
  
    // Completa la solicitud PATCH simulada con los datos actualizados
    req.flush(updatedUser);
  });
  
});