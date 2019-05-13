import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/Employee';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/department.service';
import {EditDepartmentComponent} from '../edit-department/edit-department.component';
import {EditEmployeeComponent} from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-employees-info',
  templateUrl: './employees-info.component.html',
  styleUrls: ['./employees-info.component.scss']
})
export class EmployeesInfoComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['departmentName', 'idEmployee', 'name', 'login', 'passportData', 'dateOfBirth', 'role', 'actions'];
  dataSource: MatTableDataSource<Department>;
  searchKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.departmentService.getAllDepartmentsWithEmployees().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditDialogDepartment(department: Department): void {
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      width: '600px',
      data: department
    });

    dialogRef.afterClosed().subscribe((result: undefined | Department) => {
      if (result) {
        if (result.idDepartment === -1) {
          this.departmentService.addDepartment(result).subscribe(() => this.updateData());
        } else {
          this.departmentService.updateDepartment(result).subscribe(() => this.updateData());
        }
      }
    });
  }

  openEditDialogEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '600px',
      data: employee
    });

    dialogRef.afterClosed().subscribe((result: undefined | Employee) => {
      if (result) {
        if (result.idEmployee === -1) {
          this.employeeService.addEmployee(result).subscribe(() => this.updateData());
        } else {
          this.employeeService.updateEmployee(result).subscribe(() => this.updateData());
        }
      }
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
