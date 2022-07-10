import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value:any,lowPrice:number,highPrice:number){
    const products=[];
    for (const product of value){
      if(lowPrice<=highPrice){
        if(product.price>=lowPrice && product.price<=highPrice)
        products.push(product);
      }
      else{
        if(product.price<=lowPrice && product.price>=highPrice)
        products.push(product)
      }
   }
    return products;
 }

}
