import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { userData } from 'src/app/shared/interfaces/userData.interface';
import { UsersService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { MatDialog } from '@angular/material/dialog'; // Agrega la importación de MatDialog
import { UserCreateModalComponent } from './user-create-modal/user-create-modal.component'; // Importa el componente necesario para crear usuarios

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  columnas: string[] = ['id', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<userData> = new MatTableDataSource<userData>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  deleteUser(user: userData) {
    this.userService.deleteUser(user.id.toString()).subscribe(() => {
      // Eliminar el usuario de la fuente de datos de la tabla
      const index = this.dataSource.data.indexOf(user);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
      console.log('Usuario eliminado');
    });
  }

  openModaltoEditUser(user: userData) {
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      width: '400px',
      data: { updatedUser: { ...user } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(user.id.toString(), result).subscribe(() => {
          console.log('Usuario modificado con éxito');
          // Realiza cualquier otra lógica necesaria
        });
      }
    });
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(UserCreateModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newUser: userData) => {
      if (newUser) {
        this.userService.postUser(newUser).subscribe((response) => {
          // Realiza acciones adicionales si es necesario
          console.log('Usuario agregado con éxito');
        });
      }
    });
  }
}
