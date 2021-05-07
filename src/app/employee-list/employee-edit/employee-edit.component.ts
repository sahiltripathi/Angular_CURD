import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {EmployeeService} from '../../employee.service';
import {Subscription} from 'rxjs';
import {Employee} from '../../employee.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('form', {static: false}) slForm: NgForm;
  editMode = false;
  editIndex: number;
  subscription: Subscription;
  editedItem: Employee;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.subscription = this.employeeService.startedEditing.subscribe(index => {
      this.editIndex = index;
      this.editMode = true;
      this.editedItem = this.employeeService.getEmployee(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        age: this.editedItem.age,
        email: this.editedItem.emailId
      });
    });
  }

  onSubmit(updateForm: NgForm) {
    const value = updateForm.value;
    const editEmployee = new Employee(value.name, value.age, value.email);
    if (this.editMode) {
      this.employeeService.updateEmployees(this.editIndex, editEmployee);
      this.editMode = false;
    } else {
      const value = updateForm.value;
      const Employees = new Employee(value.name, value.age, value.email);
      this.employeeService.addEmployess(Employees);
      updateForm.reset();
    }
    this.slForm.reset();
  }

  reset(): void {
    this.slForm.reset();
    this.editMode = false;
  }
}
