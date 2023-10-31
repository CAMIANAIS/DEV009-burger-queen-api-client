import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  attrsToShowPassword = {
    inputPasswordType: 'password',
    iconClass: 'far fa-eye'
  };

  constructor(private formBuilder: FormBuilder, private apiService: LoginService, private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ["", Validators.required]
    });
    console.log(this.apiService)
  }

  isFieldInvalid(fieldName: string) {
    return (
      this.loginForm?.get(fieldName)?.invalid &&
      this.loginForm.get(fieldName)?.touched
    );
  }

  showPsw() {
    const passwordViewOps = {
      inputPasswordType: 'text',
      iconClass: 'far fa-eye-slash'
   };
   const passwordOps = {
      inputPasswordType: 'password',
      iconClass: 'far fa-eye'
    }
   this.attrsToShowPassword = this.attrsToShowPassword.inputPasswordType == "password" ? passwordViewOps : passwordOps;
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

          switch (result.user.role) {
            case 'waiter':
              this.router.navigate(['/orders']);
              break;
            case 'chef':
              this.router.navigate(['/kitchen']);
              break;
            default:
              console.log('Unidentified user or unrecognized role');
              break;
          }
          
        },
        error: (error) => {
          if (error.error === 'Cannot find user') {
            this.errorMessage = 'Cannot find user';
          } else if (error.error === 'Incorrect password') {
            this.errorMessage = 'Incorrect password';
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