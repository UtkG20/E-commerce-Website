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
  q=1;
  constructor(public router:Router, private productDataService: ProductDataService) {
    this.productMap=productDataService.productMap;
    console.log(this.iprice)
    
  }

  iprice=document.getElementsByClassName('iprice');
  iquantity=document.getElementsByClassName('iquantity');
  gt:number=0;

  grandTotal(){
    console.log(this.iprice.length);
    for(let i=0;i<this.iprice.length;i++){
      console.log('hi');
      let temp1=this.iprice[i].innerHTML;
      console.log(this.iprice)
      let temp2=this.iquantity[i].innerHTML;
      this.gt=this.gt+(Number(temp1)*Number(temp2));
      console.log(this.iprice[i].innerHTML)
    }
    console.log(this.gt);
  }

  
  
  changeQuantity(event:Event){
    this.q=+(event.target as HTMLInputElement).value;
  }

  removeProduct(key:any){
    // localStorage.getItem(key)
    // this.cartMap.delete(key);
    this.variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    console.log(key);
    this.cartMap.delete(key);
    console.log(this.cartMap);
  
    for(let i=0;i<this.variable.cart.length;i++){
      if(this.variable.cart[i]==key){
        console.log('hmm');
        this.variable.cart.splice(i,1);
        break;
      }
    }
    localStorage.setItem(this.currentUser,JSON.stringify(this.variable));
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
