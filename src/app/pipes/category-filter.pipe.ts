import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value:any, selectedCategories:any , countCategory:any) {
    console.log(selectedCategories);
    if(countCategory==0||value.size===0){
      return value;
  }
    let products=new Array;
    for(let product of value){
      for( let category of product.categories){
        if(selectedCategories.get(category)===true){
        products.push(product);
        console.log(products);
        break;
        }
      }
    }
    return products;
  }

}
