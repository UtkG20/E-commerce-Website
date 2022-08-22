import { HttpClient } from '@angular/common/http';
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
  currentID:string;
  cartArrayOfID:Array<string>;
  cartArrayOfProduct:any;
  cartQuantityArray:Array<Number>;
  gt:number;
  // quantityArray:any;
  constructor(public router:Router, private productDataService: ProductDataService,private http:HttpClient) {
    this.productMap=productDataService.productMap;

    this.cartArrayOfProduct= new Array();
    // this.quantityArray=
    // console.log(this.iprice)
    
  }

  // iprice=document.getElementsByClassName('iprice');
  // iquantity=document.getElementsByClassName('iquantity');

  grandTotal(){
    this.gt=0;
    // console.log(this.gt);
    this.http.get('http://localhost:4000/user/'+this.currentID)
    .subscribe((result:any)=>{
      for(let i=0;i<result.userByID.cart.length;i++){
        console.log(result.userByID.cart[i]);
        this.http.get('http://localhost:4000/products/'+result.userByID.cart[i])
        .subscribe((prod:any)=>{
          this.gt+=(prod.productByID.price*result.userByID.quantities[i]);
        },(err:any)=>{
          console.log(err);
        })
      }
    },(err:any)=>{
      console.log(err);
    })
    // let variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    // for(let i=0;i<variable.cart.length;i++){
    //   this.gt+=((variable.quantities[i])*(this.productMap.get(variable.cart[i]).price));
    // }
  }

  
  
  changeQuantity(event:Event,key:any){
    console.log(key);
    let q=+(event.target as HTMLInputElement).value;
    console.warn('q',q);
    this.http.get('http://localhost:4000/user/'+this.currentID)
    .subscribe((result:any)=>{
      console.log(result);
      let tempCart=result.userByID.cart;
      let index=(tempCart.indexOf(key));
      let tempQuant=result.userByID.quantities;
      console.log(tempQuant);
      tempQuant[index]=q;
      console.log(tempQuant);
      
      this.http.patch('http://localhost:4000/user/quant/'+this.currentID,{quantities:tempQuant})
          .subscribe((result:any)=>{
            console.warn('prevRes',result);
            this.grandTotal();
          },(err:any)=>{
            console.warn('error',err);
          })
    },(err:any)=>{
      console.log(err);
    })
    // let variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    // let index=(this.variable.cart.indexOf(key));
    // console.log(q);
    // variable.quantities[index]=q;
    // localStorage.setItem(this.currentUser,JSON.stringify(variable));
    
  }

  removeProduct(key:any){

    let index=(this.cartArrayOfProduct.indexOf(key));
    this.cartArrayOfProduct.splice(index,1);
    this.cartArrayOfID.splice(index,1);
    this.http.patch('http://localhost:4000/user/cart/'+this.currentID,{cart:this.cartArrayOfID})
    .subscribe((result:any)=>{
      alert('product removed from cart');
    },(err:any)=>{
      console.warn('error',err)
    })

    this.http.get('http://localhost:4000/user/'+this.currentID)
    .subscribe((result:any)=>{
      let tempQuant=result.userByID.quantities;
      tempQuant.splice(index,1);
      this.http.patch('http://localhost:4000/user/quant/'+this.currentID,{quantities:tempQuant})
      .subscribe((res:any)=>{
        console.log('success');
      },(err:any)=>{
        console.log(err)
      })
    },(err:any)=>{
      console.log(err);
    })
    // this.http.get('http://localhost:4000/user/'+this.currentID)
    // .subscribe((result:any)=>{
    //   let tempCart=result.userByID.cart;
    //   tempCart.splice(index,1);
    //   let tempQuant=result.userByID.quantities;
    //   tempQuant.splice(index,1);
    //   this.http.patch('http://localhost:4000/user/cart'+this.currentID,{cart:tempCart})
    //   .subscribe((result:any)=>{
    //     alert('product removed from cart');
    //   },(err:any)=>{
    //     console.warn('error',err);
    //   })

    //   this.http.patch('http://localhost:4000/user/quant'+this.currentID,{quantities:tempQuant})
    //   .subscribe((result:any)=>{
    //     console.log('success');
    //   },(err:any)=>{
    //     console.warn('error',err);
    //   })
    // })
  }

  baseFunction(){
    for(let id of this.cartArrayOfID){
      let item=this.http.get('http://localhost:4000/products/'+id);
      item.subscribe((data:any)=>{
        this.cartArrayOfProduct.push(data.productByID);
        console.log(this.cartArrayOfProduct);
      })
    }
  }
  
  ngOnInit(): void {
    this.productDataService.currentUser.subscribe(data=>{
      this.currentUser=data;
    })

    this.productDataService.currentID.subscribe(data=>{
      this.currentID=data;
      this.grandTotal();
    })

    this.http.get('http://localhost:4000/user/'+this.currentID)
    .subscribe((result:any)=>{
      this.cartArrayOfID=result.userByID.cart;
      this.cartQuantityArray=result.userByID.quantities;
      this.baseFunction();
    })

    // console.log(this.cartArrayOfID);
    // for(let id of this.cartArrayOfID){
    //   // let item=this.http.get('http://localhost:4000/products/'+id)
    //   // console.log(item);
    //   console.log(id);
    // }
    // console.log(this.currentUser);
    // this.variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    // console.log(this.variable);
    // console.log(this.variable.cart.length);

    // for(let item of this.variable.cart){
    //   console.log(item);
    //   if(!this.cartMap.has(item))
    //     this.cartMap.set(item,1);
    //   else{
    //     console.log('h');
    //     let var2:number= this.cartMap.get(item);
    //     this.cartMap.set(item,(var2+1));
    //   }
    // }
    // console.log(this.cartMap);
  }

}
