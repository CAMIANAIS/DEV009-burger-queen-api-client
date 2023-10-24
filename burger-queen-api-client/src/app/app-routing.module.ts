import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './view/login.view/loginView';
const routes: Routes = [
    {
      path: '',
      redirectTo: '/userLogin',
      pathMatch: 'full'
    },
    {
      path: 'userLogin',
      component: LoginViewComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }