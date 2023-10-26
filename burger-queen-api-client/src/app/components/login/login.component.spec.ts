import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/components/header.component';
import { MatCard,MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(() => {
   /*const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);*/
  
  TestBed.configureTestingModule({
      declarations: [LoginComponent,HeaderComponent,MatCard,MatCardContent,MatFormField,MatError],
      imports: [HttpClientTestingModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule, FormsModule,BrowserAnimationsModule],
      providers: [LoginService], 
      
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
    });

    it('initialize the form', () => {
      expect(component.loginForm).toBeTruthy();
      expect(component.loginForm.get('email')).toBeTruthy();
      expect(component.loginForm.get('password')).toBeTruthy();
});
    it('should call login when the form is valid', () => {
      const credentials = {
        email: 'test@example.com',
        password: 'myRealPassword',
      };
      component.loginForm.setValue(credentials);
      const loginService = TestBed.inject(LoginService);
      spyOn(loginService,'login');

      component.save(new Event('click')); 
      expect(loginService.login).toHaveBeenCalledWith(credentials.email, credentials.password);
      });

});