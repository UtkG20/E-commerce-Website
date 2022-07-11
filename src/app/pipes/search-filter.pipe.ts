import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value:any,filterString:string){
    if(filterString===""||value.length==0)
    return value;
    const products=[];
    for(let product of value){
      if(product.name.toUpperCase().includes(filterString.toUpperCase()))
      products.push(product);
    }
    return products;


  }

}
