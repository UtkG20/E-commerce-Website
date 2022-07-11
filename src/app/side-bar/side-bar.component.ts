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

  value: number = 0;
  highValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000
  };
  products:any;
  categorymap=new Map();
  brandMap=new Map();
  temp:any;
  categoryCount:number=0;

  // categoryList:{name:string,isChecked:boolean}[]=[];

  constructor(private productData:ProductDataService){
    this.products=productData.products;
    for(let i=0;i<productData.products.length;i++){
      for(let j=0;j<productData.products[i].category.length;j++){
      this.categorymap.set(productData.products[i].category[j],false);
      }
      if(this.brandMap.has(productData.products[i].brand)===false)
      this.brandMap.set(productData.products[i].brand,1);
      else{
        this.temp=this.brandMap.get(productData.products[i].brand);
        this.brandMap.set(productData.products[i].brand,this.temp+1);
      }
    }
    // for(let key of this.categorymap.keys()){
    //   this.categoryList.push({name:key,isChecked:false});
    // }
  }

    

 onChange(key:any){
  if(this.categorymap.get(key)===true){
  this.categorymap.set(key,false);
  this.categoryCount--;
  }
  else{
  this.categorymap.set(key,true);
  this.categoryCount++;
  }
  this.productData.setCategory(this.categorymap);
  this.productData.countCategory(this.categoryCount);
  console.log(this.categoryCount);
 }
//  onChangeMinimum(value:any){
//   // this.value=value;
//   // this.productData.setLowRange(this.value);
//   // this.productData.setLowRange(value);
//   console.log(value.value);
//  }

//  onChangeMaximum(value:any){
//   // console.log((event.target as HTMLInputElement).value);
//   // this.productData.setHighRange((event.target as HTMLInputElement).value);
//   console.log(value.value);
//  }
  

 setRange(value:any,highValue:any){
  this.value=value.value;
  this.highValue=highValue.value;
  console.log(this.value);
  console.log(this.highValue);
  this.productData.setLowRange(this.value);
  this.productData.setHighRange(this.highValue);
}

  ngOnInit(): void {
  }

}
