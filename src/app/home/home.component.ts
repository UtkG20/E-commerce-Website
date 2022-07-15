import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../services/product-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public productDataService: ProductDataService) { }

  Accounts:any;
  ngOnInit(): void {

  this.productDataService.users.subscribe(data=>{
    this.Accounts=data;
  })
  }


}
