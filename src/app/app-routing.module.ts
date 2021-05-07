import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {AuthComponent} from './auth/auth.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'auth' , pathMatch : 'full' },
  {path: 'auth', component: AuthComponent},
  {path: 'employee', component: EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
