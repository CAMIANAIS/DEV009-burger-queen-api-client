import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';


import { LoginComponent } from './components/login/login.component';
import { LoginViewComponent } from './view/login.view/loginView';
import { LoginService } from './services/login.service';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderViewComponent } from './view/order.view/orderView';
import { HeaderComponent } from './shared/components/header.component/header.component';
import { KitchenViewComponent } from './view/kitchen.view/kitchen.view.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';

import { OrderService } from './services/orders.service';
import { ReadyOrdersViewComponent } from './view/ready-orders.view/ready-orders.view.component';
import { DeleteConfirmationDialogComponent } from './shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ReadyOrdersComponent } from './components/ready-orders/ready-orders.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginViewComponent,
    OrdersComponent,
    OrderViewComponent,
    HeaderComponent,
    KitchenViewComponent,
    KitchenComponent,
    ReadyOrdersViewComponent,
    DeleteConfirmationDialogComponent,
    ReadyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatDialogModule
  ],
  providers: [
    LoginService,
    OrderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
