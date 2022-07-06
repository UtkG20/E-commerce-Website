import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductDataService } from '../services/product-data.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private  productDataService:ProductDataService) { 

  }

  ngOnInit(): void {
  }

  countrySelected:any;

  changeCountry(event:Event){
    // this.countrySelected=(event.target as HTMLInputElement).value;
    this.productDataService.setCountry((event.target as HTMLInputElement).value)
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
