import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EditClientComponent} from '../../edit-pages/edit-client/edit-client.component';
import {Client} from '../../../models/Client';
import {ClientService} from '../../../services/client.service';

@Component({
  selector: 'app-clients-info',
  templateUrl: './clients-info.component.html',
  styleUrls: ['./clients-info.component.scss']
})
export class ClientsInfoComponent implements OnInit {

  constructor(private clientService: ClientService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['idClient', 'name', 'contacts', 'discount', 'actions'];
  dataSource: MatTableDataSource<Client>;
  searchKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.clientService.getClients().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditDialog(client: Client): void {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '600px',
      data: client
    });

    dialogRef.afterClosed().subscribe(() => this.updateData());
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


}
