import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from 'src/app/shared/components/header.component/header.component';
import { MatButtonModule } from '@angular/material/button';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent,HeaderComponent],
      imports: [
        HttpClientModule,
        MatIconModule,
        MatButtonModule
      ]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set manageUsersActive to true and manageProductsActive to false when calling usersTable', () => {
    component.usersTable();
    expect(component.manageUsersActive).toBe(true);
    expect(component.manageProductsActive).toBe(false);
  });
  
  it('should set manageProductsActive to true and manageUsersActive to false when calling productsTable', () => {
    component.productsTable();
    expect(component.manageProductsActive).toBe(true);
    expect(component.manageUsersActive).toBe(false);
  });
  
});
