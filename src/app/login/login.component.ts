import { Component, OnInit } from '@angular/core';
import {HttpClient} from"@angular/common/http";
import { ProductDataService } from '../services/product-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private productData:ProductDataService, private router:Router,private http:HttpClient) { }

  onSubmit(data:any){
    console.log(data);
    this.http.post("http://localhost:4000/user/login",data)
    .subscribe((result:any)=>{
      console.warn('result',result);
        this.productData.setCurrentUser(data.username);
        this.productData.setCurrentID(result._id);
        alert('logged in successfully');
        this.router.navigate(['home']);
    },(error:any)=>{
      alert(error.error.message)
    })
  }

  ngOnInit(): void {
  }

}
