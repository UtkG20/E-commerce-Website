import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ ProductDataService} from '../services/product-data.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(public router: Router,private productData:ProductDataService) { }


  Accounts=[
    {
      username:'utkarsh',
      password:'goyal',
      cart:[]
    },
    {
      username:'jatin',
      password:'garg',
      cart:[]
    },{
      username:'satyam',
      password:'pandey',
      cart:[]
    }

  ];
  count:any=0;

  addUser(username:any,password:any){
    this.Accounts.push({username:username.value,password:password.value,cart:[]});
    
    this.productData.setUser(this.Accounts);
    this.productData.setCurrentUser(username.value);
    this.router.navigate(['home']);
    console.log(this.Accounts);
  }

  ngOnInit(): void {
  }

}
