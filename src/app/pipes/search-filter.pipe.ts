import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value:any,filterString:string){
    if(filterString===""||value.length==0)
    return value;
    const products=new Map();
    for(let key of value.keys()){
      if(value.get(key).name.toUpperCase().includes(filterString.toUpperCase()))
      products.set(key,value.get(key));
    }
    return products;


  }

}
