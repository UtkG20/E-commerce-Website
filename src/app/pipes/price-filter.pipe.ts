import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value:any,lowPrice:any,highPrice:any){
    let products=new Map();
    for (let key of value.keys()){
        if(value.get(key).price>=lowPrice && value.get(key).price<=highPrice)
        products.set(key,value.get(key));
   }
    return products;
 }

}
