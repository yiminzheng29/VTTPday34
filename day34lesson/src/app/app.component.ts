import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom, map, take } from 'rxjs';
import { HttpBinService } from './http-bin.service';
import { UserData } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  data!: UserData
  form!: FormGroup
  
  constructor(private http: HttpClient, private fb: FormBuilder
    , private httpBinSvc: HttpBinService) { }

    ngOnInit(): void {
      this.form = this.fb.group({
        userId: this.fb.control(''),
        name: this.fb.control(''),
        email: this.fb.control(''),
      })
    }

    doPostAsForm() {
      const formdata: UserData = this.form.value
      this.httpBinSvc.doPostAsForm(formdata)
        .then(result => {
          console.info('result: ', formdata)
          this.data = result
        })
        .catch(err => {
          console.error('>>> error:', err)
        })
    }
  
    doPost() {
      const formdata: UserData = this.form.value
      this.httpBinSvc.doPost(formdata)
        .then(result => {
          console.info('result: ', formdata)
          this.data = result
        })
        .catch(err => {
          console.error('>>> error:', err)
        })
    }
  
    processForm() {
      const formData: UserData = this.form.value
      this.httpBinSvc.doGet(formData)
        .then(result => {
          console.info('>>> in then')
          this.data = result
        })
        .catch(error => {
          console.info('>>> in error')
          console.error('>>> error: ', error)
          this.data = error
        })
        .finally(() => {
          console.info('>>> in finally')
          this.ngOnInit()
        })
    }

  // doPostAsForm(data: UserData) {
  //   const headers = new Headers().set('Content-Type', 'application/x-www-form-urlencoded')
  //   let qs = new HttpParams()
  //     .set("userId", !!data.userId? data.userId: "")
  //     .set("name", data.name)
  //     .set("email", data.email)
  //   }

  // doGet() {
  //   this.http.get<any>('http://httpbin.org/get?name=fred&email=fred@gmail.com')
  //     .pipe(
  //       take(1),
  //       map(v => {
  //         return v.args
  //       })
  //     )

      // to submit get request
    // firstValueFrom<UserData>(this.http.get<any>('http://httpbin.org/get?name=fred&email=fred@gmail.com'))
    //   .then(payload => {
    //   this.data=payload.args // to only get the name and email and nothing else
    //   // outputs: { "email": "fred@gmail.com", "name": "fred" }
    // }).catch(error => {
    //   this.data=error
    // })
    

  //   firstValueFrom<UserData>(this.http.get<any>('http://httpbin.org/get?name=fred&email=fred@gmail.com'))
  //   .pipe(
  //     take(1),
  //     map(v =>v.args))// to only get the name and email and nothing else
  //     // outputs: { "email": "fred@gmail.com", "name": "fred" }
  //   .catch(error => {
  //     this.data=error
  //   })
  // }
}
