import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  EmployeesChanged = new Subject<Employee[]>();
  startedEditing = new Subject<number>();

  constructor() {
  }

  Employee: Employee[] = [
    new Employee('Rohan', 24, 'rohan@gmail.com'),
    new Employee('Samar', 30, 'samar@gmail.com'),
    new Employee('mike', 26, 'mike@gmail.com')];

  getEmployees() {
    return this.Employee.slice();
  }

  getEmployee(index: number) {
    return this.Employee[index];
  }

  addEmployess(newEmployees: Employee) {
    this.Employee.push(newEmployees);
    this.EmployeesChanged.next(this.Employee.slice());
  }

  updateEmployees(index: number, editEmployee: Employee) {

    this.Employee[index] = editEmployee;
    this.EmployeesChanged.next(this.Employee.slice());
  }


}
