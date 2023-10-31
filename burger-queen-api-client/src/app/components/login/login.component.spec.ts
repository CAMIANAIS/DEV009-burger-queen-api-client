import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ComponentFixture } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { HeaderComponent } from 'src/app/shared/components/header.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
  beforeEach(() => {
    loginServiceSpy.login.calls.reset();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HeaderComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        FormBuilder,
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('initialize the form', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.emailData).toBeTruthy();
    expect(component.passwordData).toBeTruthy();
  });

  it('should call login when the form is valid', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'myRealPassword',
    };
    component.loginForm.setValue(credentials);

    // Set up the behavior 
    loginServiceSpy.login.and.returnValue(of({
      accessToken: 'yourAccessTokenHere',
      user: {
        email: 'test@example.com',
        role: 'userRoleHere',
        id: 'userIdHere'
      }
    }));
    component.save(new Event('click'));

    expect(loginServiceSpy.login).toHaveBeenCalledWith(credentials.email, credentials.password);
  });
});
