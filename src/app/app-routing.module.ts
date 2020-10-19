import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';


const routes: Routes = [
  {path: '', redirectTo: 'employees', pathMatch:'full'},
  {path: 'employees', component:ListEmployeesComponent},
  {path: 'employee/:id', component:EditEmployeeComponent},
  {path: 'add', component:AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
