import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { LoginViewComponent } from './view/login.view/loginView';
import { LoginService } from './services/login.service';
import { OrdersComponent } from './components/mainOrderingSpace/orders/orders.component';
import { OrderViewComponent } from './view/order.view/orderView';
import { HeaderComponent } from './shared/components/header.component/header.component';
import { KitchenViewComponent } from './view/kitchen.view/kitchen.view.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminViewComponent } from './view/admin.view/admin.view.component';


import { OrderService } from './services/orders.service';
import { ReadyOrdersViewComponent } from './view/ready-orders.view/ready-orders.view.component';
import { DeleteConfirmationDialogComponent } from './shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ReadyOrdersComponent } from './components/ready-orders/ready-orders.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { ProductEditModalComponent } from './components/admin/admin-products/product-edit-modal/product-edit-modal.component';
import { ProductCreateModalComponent } from './components/admin/admin-products/product-create-modal/product-create-modal.component';
import { UserCreateModalComponent } from './components/admin/admin-users/user-create-modal/user-create-modal.component';
import { UserEditModalComponent } from './components/admin/admin-users/user-edit-modal/user-edit-modal.component';
import { ProductService } from './services/product.service';
import { UsersService } from './services/user.service';
import { DataService } from './services/data.service';
import { MenuComponent } from './components/mainOrderingSpace/menu/menu.component';
import { CommonModule } from '@angular/common';


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
    AdminUsersComponent,
    AdminProductsComponent,
    AdminComponent,
    AdminViewComponent,
    ProductEditModalComponent,
    ProductCreateModalComponent,
    UserCreateModalComponent,
    UserEditModalComponent,
    MenuComponent,
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
    MatDialogModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatSelectModule,
    RouterModule,
    CommonModule
  ],
  providers: [
    LoginService,
    OrderService,
    ProductService,
    UsersService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
