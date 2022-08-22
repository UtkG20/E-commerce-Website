import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

country=new BehaviorSubject('');

categoryMap=new BehaviorSubject(null);

categoryCount=new BehaviorSubject(0);

lowPrice= new BehaviorSubject(0);

highPrice= new BehaviorSubject(1000);

filterString=new BehaviorSubject('');

users=new BehaviorSubject([{}]);

currentUser =new BehaviorSubject('');

currentID=new BehaviorSubject('');

  products=[
    {id:1,img:"/assets/photos/t-shirt.jpeg",name:"T-Shirt",category:['Mens','Clothing'],brand:'Puma',price:50,countries:['INDIA','USA','CHINA']},
    {id:2,img:"/assets/photos/tablet.jpeg",name:"Tablet",category:['Technology','Clothing'],brand:'Samsung',price:500,countries:['INDIA','SPAIN','CHINA']},
    {id:3,img:"/assets/photos/sports-tee.jpeg",name:"Sports T-Shirt",category:['Mens','Clothing'],brand:'Nike',price:40,countries:['SPAIN','USA']},
    {id:4,img:"/assets/photos/sport-shoe.jpeg",name:"Sports Shoes",category:['Mens','Women','Kids','Clothing'],brand:'Adidas',price:80,countries:['INDIA','CHINA']},
    {id:5,img:"/assets/photos/sofa.jpeg",name:"Sofa-set",category:['Household','Interior'],brand:'Godrej',price:1000,countries:['SPAIN','USA','CHINA']},
    {id:6,img:"/assets/photos/scul-bag.jpeg",name:"School Bags",category:['Bags','Kids'],brand:'American Tourister',price:55,countries:['INDIA','USA']},
    {id:7,img:"/assets/photos/purse.jpeg",name:"Purse",category:['Women','Bags'],brand:'Skybags',price:45,countries:['INDIA','USA','SPAIN']},
    {id:8,img:"/assets/photos/men-cloth.jpeg",name:"Shirt",category:['Mens','Clothing'],brand:'Peter England',price:50,countries:['INDIA','USA','CHINA','SPAIN']},
    {id:9,img:"/assets/photos/girl-top.jpeg",name:"Girl's Top",category:['Women','Clothing'],brand:'Roadster',price:40,countries:['USA']},
    {id:10,img:"/assets/photos/frock.jpeg",name:"Frock",category:['Kids','Clothing'],brand:'Nykaa',price:45,countries:['SPAIN','USA','CHINA']},
    {id:11,img:"/assets/photos/cupboard.jpeg",name:"CupBoard",category:['Household','Interior'],brand:'Puma',price:450,countries:['USA','CHINA']}
  ]

  productMap=new Map();

  
  constructor(private http:HttpClient) {
    for(let i=0;i<this.products.length;i++){
      this.productMap.set(this.products[i].id,this.products[i])
      // console.log(this.productMap);
    }
    // for(let i=0;i<this.productMap.size;i++){
    //   console.log(this.productMap.get(i+1));
    // }
   }

  setCountry(country:any){
    this.country.next(country)
  }


  productFromAPI(){
    return this.http.get("http://localhost:4000/products")
  }
  setCategory(categoryMap:any){
    this.categoryMap.next(categoryMap);
  }

  countCategory(categoryCount:any){
    this.categoryCount.next(categoryCount);
  }

  setLowRange(lowPrice:any){
    this.lowPrice.next(lowPrice);
  }
  setHighRange(highPrice:any){
    this.highPrice.next(highPrice);
  }

  searchString(filterString:any){
    this.filterString.next(filterString);
  }

  setUser(users:any){
    this.users.next(users);
    console.log(this.users);
  }

  setCurrentUser(currentUser:any){
    this.currentUser.next(currentUser);
  }

  setCurrentID(currentID:string){
    this.currentID.next(currentID);
  }
}
