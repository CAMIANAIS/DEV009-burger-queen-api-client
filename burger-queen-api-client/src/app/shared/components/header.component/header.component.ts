import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private loginService: LoginService) {}

  logout() {
    this.loginService.logout();
  }
}