import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductDataService } from '../services/product-data.service';
@Component({
  selector: 'app-main-bar',
  templateUrl: './main-bar.component.html',
  styleUrls: ['./main-bar.component.css']
})
export class MainBarComponent implements OnInit {

 products:any;
  constructor(private productData:ProductDataService, private productDataService:ProductDataService) { 
    this.products=productData.products;
  }

  selectedCountry:any;
  ngOnInit(): void {
    this.productDataService.country.subscribe(data=>{
      this.selectedCountry=data;
    })
  }

  countryFilter(){
    for(let i=0;i<this.products.length;i++){
      for(let j=0;j<this.products[i].countries.length;j++){
        if(this.products[i].countries[j]===this.selectedCountry){
          
        }

      }
    }
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
      }
    },
    nav: true
  }
}
