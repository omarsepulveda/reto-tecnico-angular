import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: any;
  currentEmployee = null;
  currentIndex = -1;
  first_name = '';

  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit() {
    this.retrieveEmployee();
  }

  retrieveEmployee() {
    this.employeeService.getAll()
      .subscribe(
        data => {
          this.employees = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveEmployee();
    this.currentEmployee = null;
    this.currentIndex = -1;
  }

  setActiveEmployee(employee, index) {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  removeEmployees() {
    this.employeeService.delete(this.currentEmployee.id_employee)
      .subscribe(
        response => {
          console.log(this.currentEmployee.id_employee)
          console.log(response);
          this.retrieveEmployee();
        },
        error => {
          console.log(error);
        });
  }

  searchName() {
    this.employeeService.findByName(this.first_name)
      .subscribe(
        data => {
          this.employees = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}