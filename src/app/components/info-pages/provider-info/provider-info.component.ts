import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Provider} from '../../../models/Provider';
import {EditProviderComponent} from '../../edit-pages/edit-provider/edit-provider.component';
import {DeliveryHistoryItem} from '../../../models/DeliveryHistoryItem';
import {HistoryService} from '../../../services/history.service';
import {EditHistoryItemComponent} from '../../edit-pages/edit-history-item/edit-history-item.component';
import {ProviderService} from '../../../services/provider.service';

@Component({
  selector: 'app-provider-info',
  templateUrl: './provider-info.component.html',
  styleUrls: ['./provider-info.component.scss']
})
export class ProviderInfoComponent implements OnInit {

  constructor(private providerService: ProviderService, private historyService: HistoryService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['contractInfo', 'Ingredients_idIngredient', 'count', 'cost', 'date', 'ingredientName'];
  dataSource: MatTableDataSource<Provider>;
  searchKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.historyService.getFullHistory().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditDialogProvider(provider: Provider): void {
    const dialogRef = this.dialog.open(EditProviderComponent, {
      width: '300px',
      data: provider
    });

    dialogRef.afterClosed().subscribe((result: undefined | Provider) => {
      if (result) {
        console.log(result);
        if (result.idProvider === -1) {
          this.providerService.addProvider(result).subscribe(() => this.updateData());
        } else {
          this.providerService.updateProvider(result).subscribe(() => this.updateData());
        }
      }
    });
  }

  openEditDialogHistory(historyItem: DeliveryHistoryItem): void {
    const dialogRef = this.dialog.open(EditHistoryItemComponent, {
      width: '600px',
      data: historyItem
    });

    dialogRef.afterClosed().subscribe((result: undefined | DeliveryHistoryItem) => {
      if (result) {
        console.log(result);
        this.historyService.addItem(result).subscribe(() => this.updateData());
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
