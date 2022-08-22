import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  transform(value:any,selectedCountry:any){
    if(selectedCountry==0||value.size===0){
      return value;
    }
    let products=new Array;
    for(let product of value){
      for(let country of product.countries){
        if(country===selectedCountry){
          products.push(product);
          break;
        }
      }
    }
    return products;
  }
}
