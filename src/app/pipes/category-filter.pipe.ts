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
    let products=new Map();
    for(const key of value.keys()){
      for(const category of value.get(key).category){
        if(selectedCategories.get(category)===true){
        products.set(key,value.get(key));
        console.log(products);
        break;
        }
      }
    }
    return products;
  }

}
