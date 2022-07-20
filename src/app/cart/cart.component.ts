import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from '../services/product-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartMap=new Map();
  variable:any;
  currentUser:any;
  productMap:any;
  // quantityArray:any;
  constructor(public router:Router, private productDataService: ProductDataService) {
    this.productMap=productDataService.productMap;
    // this.quantityArray=
    // console.log(this.iprice)
    
  }

  // iprice=document.getElementsByClassName('iprice');
  // iquantity=document.getElementsByClassName('iquantity');
  gt:number=0;

  grandTotal(){
    // console.log(this.iprice.length);
    // for(let i=0;i<this.iprice.length;i++){
    //   console.log('hi');
    //   let temp1=this.iprice[i].innerHTML;
    //   console.log(this.iprice)
    //   let temp2=this.iquantity[i].innerHTML;
    //   this.gt=this.gt+(Number(temp1)*Number(temp2));
    //   console.log(this.iprice[i].innerHTML)
    // }
    this.gt=0;
    console.log(this.gt);
    let variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    for(let i=0;i<variable.cart.length;i++){
      this.gt+=((variable.quantities[i])*(this.productMap.get(variable.cart[i]).price));
    }
  }

  
  
  changeQuantity(event:Event,key:any){
    let q=+(event.target as HTMLInputElement).value;
    let variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    let index=(this.variable.cart.indexOf(key));
    console.log(q);
    variable.quantities[index]=q;
    localStorage.setItem(this.currentUser,JSON.stringify(variable));
    this.grandTotal();
  }

  removeProduct(key:any){
    // localStorage.getItem(key)
    // this.cartMap.delete(key);
    let variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    let index=(this.variable.cart.indexOf(key));
    variable.quantities.splice(index,1);
    variable.cart.splice(index,1)
    this.cartMap.delete(key);
    console.log(variable);
    localStorage.setItem(this.currentUser,JSON.stringify(variable));
  }

  
  ngOnInit(): void {
    this.productDataService.currentUser.subscribe(data=>{
      this.currentUser=data;
    })

    console.log(this.currentUser);
    this.variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    // console.log(this.variable);
    // console.log(this.variable.cart.length);

    for(let item of this.variable.cart){
      console.log(item);
      if(!this.cartMap.has(item))
        this.cartMap.set(item,1);
      else{
        console.log('h');
        let var2:number= this.cartMap.get(item);
        this.cartMap.set(item,(var2+1));
      }
    }
    console.log(this.cartMap);
    this.grandTotal();
  }

}
