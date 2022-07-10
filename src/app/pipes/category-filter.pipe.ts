import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value:any, selectedCategories:any , countCategory:any) {
    if(countCategory==0||value.length===0)
    return value;

    const products=[];
    for(const product of value){
      for(const category of product.category){
        if(selectedCategories.get(category)===true){
        products.push(product);
        break;
        }
      }
    }
    return products;
  }

}
