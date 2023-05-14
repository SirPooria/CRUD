import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UsersService } from './services/users.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
import { Jalali } from 'jalali-ts';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userform: FormGroup;
  displayedColumns: string[] = [
  'id',
  'Name',
  'Dob',
  'Gender',
  'Province',
  'City',
  'Activition',
  'Manage'
];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor (
    private _dialog: MatDialog,
    private _userservice: UsersService,
    private _coreService: CoreService,
    private _fb: FormBuilder,
  ){
    this.userform = this._fb.group({
      Name:'',
      Dob: '',
      Gender: '',
      Password: '',
      Rpassword: '',
      Activition: '',
      Province: '',
      City: ''
    });
  }
  ngOnInit(): void {
    this.getUserList();
  }
  OpenAddEdituserForm() {
    const dialogRef = this._dialog.open(UserAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getUserList();
        }
      },
    });
  }
  getUserList() {
    this._userservice.GetUserList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteUser(id: number) {
    this._userservice.deleteUser(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar("User Deleted!", "ok");
          this.getUserList();
        },
        error: console.log,
    });
  }
  OpenEditForm(data: any) {
    const dialogRef = this._dialog.open(UserAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getUserList();
        }
      },
    });
  }
}
