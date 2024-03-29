import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductDataService } from '../services/product-data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {

  subscribe:Subscription;
  Accounts:any;
  currentUser:any;

  constructor(private  productDataService:ProductDataService) { 
    this.subscribe=Subscription.EMPTY;
  }

  ngOnInit(): void {

  this.productDataService.users.subscribe(data=>{
    this.Accounts=data;
  })

  this.productDataService.currentUser.subscribe(data=>{
    this.currentUser=data;
  })
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  countrySelected:string="";
  filterString:string='';

  // logout(){
  //   this.currentUser=null;
  // }
  changeCountry(event:Event){
    // this.countrySelected=(event.target as HTMLInputElement).value;
    this.productDataService.setCountry((event.target as HTMLInputElement).value)
  }

  onSearch(value:any){
    this.productDataService.searchString(value.value)
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
     
    },
    nav: true
  }
}
