import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { BookModel } from './book-dashboard.model'
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent implements OnInit {

  formValue !: FormGroup;
  bookModelObj : BookModel = new BookModel();
  bookdata !: any;
  showAdd! :boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, 
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      slno : [''],
      booktitle : [''],
      authorname : ['']
    })
    this.getAllBook();
  }
  clickAddBook() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postBookDetails(){
    this.bookModelObj.slno = this.formValue.value.slno;
    this.bookModelObj.booktitle = this.formValue.value.booktitle;
    this.bookModelObj.authorname = this.formValue.value.authorname;
   
    this.api.postBook(this.bookModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Book added successfully!")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset();
      this.getAllBook();
    }, 
    err=>{
      alert("Something went wrong");
    })
  }
  getAllBook(){
    
    this.api.getBook()
    .subscribe(res=>{
      this.bookdata = res;
      
    })
  }
  deleteBook(row : any){
    this.api.deleteBook(row.slno)
    .subscribe(res=>{
      alert("Book Deleted")
      console.log(res);
      this.getAllBook();
    })
  }
   onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.bookModelObj.slno = row.id;
    this.formValue.controls['slno'].setValue(row.slno);
    this.formValue.controls['booktitle'].setValue(row.booktitle);
    this.formValue.controls['authorname'].setValue(row.authorname);
  }
  updateBookDetails(){
    this.bookModelObj.slno = this.formValue.value.slno;
    this.bookModelObj.booktitle = this.formValue.value.booktitle;
    this.bookModelObj.authorname = this.formValue.value.authorname;

    this.api.updateBook(this.bookModelObj,this.bookModelObj.slno);
   // .subscribe(res=>{
     // alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset();
      this.getAllBook();

    }
  
  }



