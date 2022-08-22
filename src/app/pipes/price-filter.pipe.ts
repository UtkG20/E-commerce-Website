import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value:any,lowPrice:any,highPrice:any){
    let products=new Array;
    for (let product of value){
        if(product.price>=lowPrice && product.price<=highPrice)
        products.push(product);
   }
    return products;
 }

}
