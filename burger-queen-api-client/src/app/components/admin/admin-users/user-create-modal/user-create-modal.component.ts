import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { userData } from 'src/app/shared/interfaces/userData.interface';

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.css']
})
export class UserCreateModalComponent {
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserCreateModalComponent>,
    private fb: FormBuilder,
    private userService: UsersService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: userData = this.userForm.value;
      this.userService.postUser(newUser).subscribe((response) => {
        this.dialogRef.close(response); // Cierra el modal y pasa los datos del nuevo usuario
      });
    }
  }
}

