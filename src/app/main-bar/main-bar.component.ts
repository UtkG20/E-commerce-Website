import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ProductDataService } from '../services/product-data.service';
@Component({
  selector: 'app-main-bar',
  templateUrl: './main-bar.component.html',
  styleUrls: ['./main-bar.component.css']
})
export class MainBarComponent implements OnInit,OnDestroy {

 products:any;
 productMap:any;
 
  constructor(private productData:ProductDataService, private productDataService:ProductDataService,private http:HttpClient) { 
    this.productData.productFromAPI().subscribe(data=>{
      console.log("data",data);
      this.products=data;
      console.log(this.products)
    })
    // this.products=productData.products
    this.productMap=productData.productMap;
    this.subscribe= Subscription.EMPTY;
  }
  subscribe:Subscription;

  selectedCountry:any;
  selectedCategories:any;
  categoryCount:any;
  lowPrice:any;
  highPrice:any;
  filterString:any;
  currentUser:any;
  currentID:string;
  

  ngOnInit(): void {
    this.subscribe = this.productDataService.country.subscribe(data=>{
      this.selectedCountry=data;
    })

    this.productDataService.categoryMap.subscribe(data=>{
      this.selectedCategories=data;
    })

    this.productDataService.categoryCount.subscribe(data=>{
      this.categoryCount=data;
    })

    this.productDataService.lowPrice.subscribe(data=>{
      this.lowPrice=data;
    })

    this.productDataService.highPrice.subscribe(data=>{
      this.highPrice=data;
    })

    this.productDataService.filterString.subscribe(data=>{
      this.filterString=data;
    })

    this.productDataService.currentUser.subscribe(data=>{
      this.currentUser=data;
    })

    this.productDataService.currentID.subscribe(data=>{
      this.currentID=data;
    })
  }

  ngOnDestroy(){
      this.subscribe.unsubscribe();
  }

  // countryFilter(){
  //   for(let i=0;i<this.products.length;i++){
  //     for(let j=0;j<this.products[i].countries.length;j++){
  //       if(this.products[i].countries[j]===this.selectedCountry){
          
  //       }

  //     }
  //   }
  // }

  addToCart(key:any){
    // console.log(key)
    // console.log('http://localhost:4000/user/'+this.currentID);
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
    // let variable=JSON.parse(localStorage.getItem(this.currentUser.toString())!);
    // if(!variable.cart.includes(key)){
    //   variable.cart.push(key);
    //   variable.quantities.push(1);
    // }
    // localStorage.setItem(this.currentUser,JSON.stringify(variable));
    // console.log(variable);
  }

  addToWishlist(key:any){
    this.http.get('http://localhost:4000/user/'+this.currentID)
    .subscribe((result:any)=>{
      console.log(result.userByID.wishlist);
      let tempWishlist=result.userByID.wishlist;
      if(!tempWishlist.includes(key)){
        tempWishlist.push(key);
        console.log(tempWishlist);
          this.http.patch('http://localhost:4000/user/wishlist/'+this.currentID,{wishlist:tempWishlist})
          .subscribe((result:any)=>{
            alert('item added to wishlist');
          },(err:any)=>{
            alert(err);
          })
        }else{
          alert('item already present in your wishlist')
        }
    },(err:any)=>{
      alert(err);
    })
    // console.log(this.currentUser)
    // let variable=JSON.parse(localStorage.getItem(this.currentUser.toString())!);
    // if(!variable.wishlist.includes(key))
    //   variable.wishlist.push((key));
    // localStorage.setItem(this.currentUser,JSON.stringify(variable));
    // console.log(variable);
  }

  id:any="open";
  collapse(id:any){
    if(this.id==id)
    this.id="";
    else
    this.id=id;
  }
  

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="main-carousel fa-solid fa-circle-arrow-left"></i>', '<i class="main-carousel fa-solid fa-circle-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      900: {
        items: 4
      },
      1000:{
        items:5
      }
    },
    nav: true
  }
}
