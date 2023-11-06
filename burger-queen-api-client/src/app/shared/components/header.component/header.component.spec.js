import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginService: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    // Crea un objeto mock para el servicio LoginService
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['logout']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginService.logout() on logout', () => {
    // Simula el evento de clic en el botón de cierre de sesión
    component.logout();

    // Asegúrate de que loginService.logout() haya sido llamado
    expect(loginService.logout).toHaveBeenCalled();
  });
});
