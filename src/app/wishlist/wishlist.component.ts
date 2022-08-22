import { HttpClient } from '@angular/common/http';
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
  currentID:any;
  variable:any;
  wishListArrayOfID:Array<string>;
  wishListArrayOfProducts:any;

  constructor(private productDataService: ProductDataService,private http:HttpClient) {
    this.productMap=productDataService.productMap;
    this.wishListArrayOfProducts=new Array();
  }

  baseFunction(){
    
    for(let id of this.wishListArrayOfID){
      let item=this.http.get('http://localhost:4000/products/'+id);
      item.subscribe((data:any)=>{
        console.log('working');
        this.wishListArrayOfProducts.push(data.productByID);
        console.log(this.wishListArrayOfProducts);
      })
    }
  }

   removeProduct(key:any){
    let index=(this.wishListArrayOfProducts.indexOf(key));
    this.wishListArrayOfProducts.splice(index,1);
    this.wishListArrayOfID.splice(index,1);
    this.http.patch('http://localhost:4000/user/wishlist/'+this.currentID,{wishlist:this.wishListArrayOfID})
    .subscribe((result:any)=>{
      alert('product removed from wishlist');
    },(err:any)=>{
      console.warn('error',err)
    })


    // let variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    // let index=(variable.cart.indexOf(key));
    // // variable.quantities.splice(index,1);
    // variable.wishlist.splice(index,1)
    // this.cartMap.delete(key);
    // console.log(variable);
    // localStorage.setItem(this.currentUser,JSON.stringify(variable));
  }

  ngOnInit(): void {
    this.productDataService.currentUser.subscribe(data=>{
      this.currentUser=data;
    })

    this.productDataService.currentID.subscribe(data=>{
      this.currentID=data;
    })

    this.http.get('http://localhost:4000/user/'+this.currentID)
    .subscribe((result:any)=>{
      this.wishListArrayOfID=result.userByID.wishlist;
      console.log(this.wishListArrayOfID);
      this.baseFunction();
    })

    this.variable=JSON.parse(localStorage.getItem(this.currentUser)!);
    // console.log(this.variable);
    // console.log(this.variable.cart.length);

    

    // for(let item of this.variable.wishlist){
    //   console.log(item);
    //   if(!this.cartMap.has(item))
    //     this.cartMap.set(item,1);
    //   else{
    //     console.log('h');
    //     let var2:number= this.cartMap.get(item);
    //     this.cartMap.set(item,(var2+1));
    //   }
    // }
  }

  addToCart(key:any){
    this.http.get('http://localhost:4000/user/'+this.currentID)
    .subscribe((result:any)=>{
      console.log(result.userByID.cart);
      let tempCart=result.userByID.cart;
      
      if(!tempCart.includes(key)){
        tempCart.push(key);
        let tempQuant=result.userByID.quantities;
        console.warn('quantity',tempQuant);
        tempQuant.push(1);
        console.log(tempCart);
        console.log(tempQuant);
          this.http.patch('http://localhost:4000/user/cart/'+this.currentID,{cart:tempCart})
          .subscribe((result:any)=>{
            alert('item added to cart');
          },(err:any)=>{
            alert(err);
          })
          this.http.patch('http://localhost:4000/user/quant/'+this.currentID,{quantities:tempQuant})
          .subscribe((result:any)=>{
            console.warn('prevRes',result);
          },(err:any)=>{
            console.warn('error',err);
          })
        }else{
          alert('item already present in your cart')
        }
    },(err:any)=>{
      alert(err);
    })




    // console.log(this.currentUser)
    // let variable=JSON.parse(localStorage.getItem(this.currentUser.toString())!);
    // if(!variable.cart.includes(key)){
    //   variable.cart.push(key);
    //   variable.quantities.push(1);
    // }
    // localStorage.setItem(this.currentUser,JSON.stringify(variable));
    // console.log(variable);
  }
  
}
