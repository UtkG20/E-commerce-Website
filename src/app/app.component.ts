import { Component } from '@angular/core';
import{ ProductDataService} from './services/product-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tomato';
  products:any;
  constructor(private productData:ProductDataService){
    this.products=productData.products;
  }
}
