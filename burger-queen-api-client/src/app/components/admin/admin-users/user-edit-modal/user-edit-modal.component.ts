import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userData } from 'src/app/shared/interfaces/userData.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent {
  userForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { updatedUser: userData },
    public dialogRef: MatDialogRef<UserEditModalComponent>,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: [data.updatedUser.email, [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      role: [data.updatedUser.role, Validators.required],
      id:[],
    });
  }

  saveChanges() {
    if (this.userForm.valid) {
      const { email, currentPassword, newPassword, role, id } = this.userForm.value;
      const updatedUser: userData = { id, email, password: newPassword, role };
      this.dialogRef.close(updatedUser);
    }
  }
  

  closeModal() {
    this.dialogRef.close();
  }
}
