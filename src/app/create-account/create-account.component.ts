import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from"@angular/common/http";
import{ ProductDataService} from '../services/product-data.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(public router: Router,private productData:ProductDataService, private http:HttpClient) { }


  onSubmit(data:any){
    console.log(data);
    if(data.username===''||data.password===''){
      alert("please fill all the required fields")
      return
    }
    
    this.http.post("http://localhost:4000/user/signup",data)
    .subscribe((result:any)=>{
        console.log(result)
        alert('User registered.Now you will be directed to login page')
        this.router.navigate(['']);
    },(error:any)=>{
      console.log(error.error.message);
      alert(error.error.message)
    })
  }

  ngOnInit(): void {
  }

}
