import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  spinner = false

  epass = true
  quantity = 1

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if(params.quantity && params.e_pass) {
        this.quantity = params.quantity
        this.epass = params.e_pass
      }
    })
  }

  register() {
    if (!this.formData.valid) return
    this.spinner = true
    const data = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      s_username: this.formData.controls.username.value as string,
      s_password: this.formData.controls.password.value as string,
      event_pass: this.epass,
      quantity: this.quantity,
      amt: this.quantity * 50
    }

    this.httpClient.post(environment.endpoint + '/register', data).subscribe({
      next: (res: any) => {
        if (res.error == false) {
          alert('Registration successful')
          //this.router.navigate(['dashboard'])
        } else {
          alert('Wrong credentials')
        }
        this.spinner = false
      },
      error: (e) => {
        alert('Error occured')
        this.spinner = false
      }
    })
  }


}
