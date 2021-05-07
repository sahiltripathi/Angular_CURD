import {Component, OnInit} from '@angular/core';
import {Employee} from '../employee.model';
import {EmployeeService} from '../employee.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  Employees: Employee[];
  ListChanged = new Subject<Employee[]>();
  editMode: Boolean = false;

  constructor(public  employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.Employees = this.employeeService.Employee;
  }

  onEdit(i: number) {
    this.employeeService.startedEditing.next(i);
  }

  onDelete(i: any) {
    this.employeeService.Employee.splice(i, 1);
    this.ListChanged.next(this.Employees.slice());

  }
}
