import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/orders.service';
import { ordersData } from 'src/app/shared/interfaces/orderData.interface';
import { ReadyOrdersComponent } from 'src/app/components/ready-orders/ready-orders.component';
@Component({
  selector: 'app-ready-orders.view',
  templateUrl: './ready-orders.view.component.html',
  styleUrls: ['./ready-orders.view.component.css']
})
export class ReadyOrdersViewComponent{

}

