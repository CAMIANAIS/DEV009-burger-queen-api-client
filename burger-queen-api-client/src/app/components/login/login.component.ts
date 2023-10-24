import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';// Inicializa una cadena vacía para almacenar mensajes de error.


  constructor(private formBuilder: FormBuilder, private apiService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  async save(event: Event) {
    event.preventDefault();

    const formData = this.loginForm.value;

    this.apiService.login(formData.email, formData.password)
      .subscribe({
        next: (result) => {
          
          sessionStorage.setItem('token', result.accessToken);
          sessionStorage.setItem('idUser', result.user.id);
          sessionStorage.setItem('role', result.user.role);
          sessionStorage.setItem('email', result.user.email)

          const role = sessionStorage.getItem('role');
          const token = sessionStorage.getItem('token');

          switch (role) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;

            case 'chef':
              this.router.navigate(['/kitchen']);
              break;

            case 'waiter':
              this.router.navigate(['/orders']);
              break;

            default:
              console.log('Unexpected Error');
          }
          console.log('Access Token:', token);
          
        },
        error: (error) => {

          if (error.error === 'Cannot find user') {
            this.errorMessage = 'Cannot find user';
          }
          else if (error.error === 'Incorrect password') {
            this.errorMessage = 'Incorrect password';
          }
        },
      });

    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  get emailInput() {
    return this.loginForm.get('email');
  }

  get passwordInput() {
    return this.loginForm.get('password');
  }
}
