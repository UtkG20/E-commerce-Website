import { Component, OnDestroy, OnInit } from '@angular/core';
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
 
  constructor(private productData:ProductDataService, private productDataService:ProductDataService) { 
    this.products=productData.products;
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
  }

  ngOnDestroy(){
      this.subscribe.unsubscribe();
  }

  countryFilter(){
    for(let i=0;i<this.products.length;i++){
      for(let j=0;j<this.products[i].countries.length;j++){
        if(this.products[i].countries[j]===this.selectedCountry){
          
        }

      }
    }
  }

  addToCart(key:any){
    console.log(this.currentUser)
    let variable=JSON.parse(localStorage.getItem(this.currentUser.toString())!);
    if(!variable.cart.includes(this.productMap.get(key)))
      variable.cart.push(this.productMap.get(key));
    localStorage.setItem(this.currentUser,JSON.stringify(variable));
    console.log(variable);
  }

  addToWishlist(key:any){
    console.log(this.currentUser)
    let variable=JSON.parse(localStorage.getItem(this.currentUser.toString())!);
    variable.wishlist.push(this.productMap.get(key));
    localStorage.setItem(this.currentUser,JSON.stringify(variable));
    console.log(variable);
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
