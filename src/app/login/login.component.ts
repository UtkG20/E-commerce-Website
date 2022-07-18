import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../services/product-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private productData:ProductDataService, private router:Router) { }

  loginUser(username:any,password:any){
    if(localStorage.getItem(username.value)){
      let userData=JSON.parse(localStorage.getItem(username.value)!);
      if(userData.password===password.value){
        this.productData.setCurrentUser(username.value);
        this.router.navigate(['home']);
      }
      else{
        alert('invalid password ');
      }
    }
    else{
      alert('invalid username and password')
    }
  }
  ngOnInit(): void {
  }

}
