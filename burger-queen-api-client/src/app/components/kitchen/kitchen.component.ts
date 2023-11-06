import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrderService } from 'src/app/services/orders.service';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { calculateElapsedTime } from 'src/app/shared/utils/elapsedTime';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'status', 'client', 'products', 'timer'];
  dataSource: MatTableDataSource<ordersData> = new MatTableDataSource<ordersData>([]); // Fuente de datos de la tabla
  orders: ordersData[] = [];
  showDeleteColumn: boolean = true;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((data) => {
      this.dataSource.data = data; // Establece los datos en la fuente de datos de la tabla
      this.dataSource.sort = this.sort; // Configura la clasificación
      this.dataSource.sort.direction = 'desc';
      this.dataSource.sort.active = 'id';
    });
  }

  deleteOrder(order: ordersData) {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      // Eliminar la orden de la fuente de datos de la tabla
      const index = this.dataSource.data.indexOf(order);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
      console.log('Orden eliminada');
    });
  }

  changeStatusOrder(order: ordersData) {
    // Check the current status of the order
    if (order.status === 'pending') {
      // Change the status to 'done' when it's currently 'pending'
      order.status = 'done';

      // Make an HTTP request to update the order status on the server
      this.orderService.updateOrderStatus(order.id, 'done').subscribe(() => {
        console.log('Order status updated on the server.');
      });
    }
  } 
  

  calculateElapsedTimeForOrder(order: ordersData): string {
    if (order.dataEntry && order.dateProcessed) {
      return calculateElapsedTime(order.dataEntry, order.dateProcessed);
    }
  
    return ''; 
  }
  
  openDeleteConfirmationDialog(order: ordersData) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: order,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteOrder(order);
      }
    });
  }

}
