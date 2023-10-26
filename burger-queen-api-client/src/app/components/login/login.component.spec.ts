import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
describe('LoginComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
      declarations: [LoginComponent]
    }));
  
    it('should create the app', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
});