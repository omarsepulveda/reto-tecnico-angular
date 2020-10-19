import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee = {
    first_name: '',
    last_name: '',
    id_boss: '',
    published: false
  };
  submitted = false;
  formulario: FormGroup;

  constructor(
    private employeeService: EmployeeServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addForm();
  }

  addForm() {
    this.formulario = this.fb.group({
      camposEmpleados: this.fb.array([])
    });
  }

  get camposEmpleados(): FormArray {
    return this.formulario.get('camposEmpleados') as FormArray;
  }

  addCamposEmpleados() {
    const campos = this.fb.group({
      descripcion: new FormControl('')
    });
  
    this.camposEmpleados.push(campos);
  }

  deleteCampo(indice: number) {
    this.camposEmpleados.removeAt(indice);
  }

  saveEmployee() {
    const data = {
      id_boss: this.employee.id_boss,
      first_name: this.employee.first_name,
      last_name: this.employee.last_name
    };

    this.employeeService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newEmployee() {
    this.submitted = false;
    this.employee = {
      first_name: '',
      last_name: '',
      id_boss: '',
      published: false
    };
  }
}