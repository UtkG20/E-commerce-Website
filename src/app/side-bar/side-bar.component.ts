import { Component, OnInit } from '@angular/core';
import{ ProductDataService} from '../services/product-data.service';
import { Options } from "@angular-slider/ngx-slider";
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  // mySet=new Set();
  // for(let product of products){
  //   for(let cats of product.category){
  //     this.mySet.add(product.category.cats);
  //   } 
  // }
  products:any;
  categorymap=new Map();
  brandMap=new Map();

  constructor(private productData:ProductDataService){
    this.products=productData.products;
    for(let i=0;i<productData.products.length;i++){
      for(let j=0;j<productData.products[i].category.length;j++)
      this.categorymap.set(productData.products[i].category[j],true);

      this.brandMap.set(productData.products[i].brand,true);
    }
  }

  value: number = 300;
  highValue: number = 600;
  options: Options = {
    floor: 0,
    ceil: 1000
  };

 
  

  ngOnInit(): void {
  }

}
