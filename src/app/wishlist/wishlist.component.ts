import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from '../services/product-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  productMap:any;
  cartMap=new Map();
  currentUser:any;
  variable:any;
  constructor(private productDataService: ProductDataService) {
    this.productMap=productDataService.productMap;
   }


   removeProduct(key:any){
    // localStorage.getItem(key)
    // this.cartMap.delete(key);
    let variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    let index=(variable.cart.indexOf(key));
    // variable.quantities.splice(index,1);
    variable.wishlist.splice(index,1)
    this.cartMap.delete(key);
    console.log(variable);
    localStorage.setItem(this.currentUser,JSON.stringify(variable));
  }

  ngOnInit(): void {
    this.productDataService.currentUser.subscribe(data=>{
      this.currentUser=data;
    })

    this.variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    // console.log(this.variable);
    // console.log(this.variable.cart.length);

    

    for(let item of this.variable.wishlist){
      console.log(item);
      if(!this.cartMap.has(item))
        this.cartMap.set(item,1);
      else{
        console.log('h');
        let var2:number= this.cartMap.get(item);
        this.cartMap.set(item,(var2+1));
      }
    }
  }

  addToCart(key:any){
    console.log(this.currentUser)
    let variable=JSON.parse(localStorage.getItem(this.currentUser.toString())!);
    if(!variable.cart.includes(key)){
      variable.cart.push(key);
      variable.quantities.push(1);
    }
    localStorage.setItem(this.currentUser,JSON.stringify(variable));
    console.log(variable);
  }
  
}
