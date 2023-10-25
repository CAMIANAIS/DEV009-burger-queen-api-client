import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginMatcher } from 'src/app/shared/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';


  constructor(private formBuilder: FormBuilder, private apiService: LoginService) {
    this.loginForm = this.formBuilder.group({
      email: '', 
      password: '', 
    });
    console.log(this.loginForm)
  }



  ngOnInit() {}

  async save(event: Event) {
    event.preventDefault();

    const formData = this.loginForm.value;
    console.log(formData)

    this.apiService.login(formData.email, formData.password)
    
      .subscribe({
        next: (result) => {
          
          localStorage.setItem('token', result.accessToken);
          localStorage.setItem('idUser', result.user.id);
          localStorage.setItem('role', result.user.role);
          localStorage.setItem('email', result.user.email)
          
        },
        error: (error) => {
          if (error.error === 'Cannot find user') {
            this.errorMessage = 'Cannot find user';
          } else if (error.error === 'Incorrect password') {
            this.errorMessage= 'Incorrect password';
          }
        },
        
      });

    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  get emailData() {
    return this.loginForm.get('email');
  }

  get passwordData() {
    return this.loginForm.get('password');
  }
}
