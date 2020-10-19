import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  currentEmployee = null;
  message = '';

  constructor(
    private employeeService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getEmployee(this.route.snapshot.paramMap.get('id'));
  }
  
  getEmployee(id) {
    this.employeeService.get(id)
      .subscribe(
        data => {
          this.currentEmployee = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateBoss(id_boss) {
    const data = {
      first_name: this.currentEmployee.first_name,
      last_name: this.currentEmployee.last_name,
      id_boss: this.currentEmployee.id_boss
    };

    this.employeeService.update(this.currentEmployee.id, data)
      .subscribe(
        response => {
          this.currentEmployee.id_boss = id_boss;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateEmployee() {
    this.employeeService.update(this.route.snapshot.paramMap.get('id'), this.currentEmployee)
      .subscribe(
        data => {
          this.currentEmployee = data;
          console.log(this.route.snapshot.paramMap.get('id'));
          //console.log(response);
          this.message = 'Empleado actualizado!';
        },
        error => {
          console.log(error);
        });
  }

  deleteEmployee() {
    this.employeeService.delete(this.route.snapshot.paramMap.get('id'))
    .subscribe(
      response => {
          console.log(response);
          this.router.navigate(['/employees']);
        },
        error => {
          console.log(error);
        });
  }
}
