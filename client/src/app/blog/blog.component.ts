import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../services/auth.Service';
import {BlogService} from '../services/blog.service';
import {AdminservicesService} from '../services/adminservices.service'

import { AstMemoryEfficientTransformer } from '@angular/compiler';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  processing=false;
  messageClass;
  pageChoosed:boolean;
  selectedPage:string;
  message;
  newPost:boolean;
  //newImage=false;
  loadingBlogs=false;
  pages={};
  form;
  username;
  //uploader : FileUploader;
  //imagePreview:string;
  
  blogPosts;
  url="";
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private blogService:BlogService,
    private adminService : AdminservicesService
   
  ) {
      this.createNewBlogForm();
   }

  ngOnInit() {
    this.username=localStorage.getItem('user');
    //this.getAllBlogs();
    this.selectedPage="MxiansPage"
    this.pageChoosed=false;
    this.getAllBlogs();
    //this.selectedPage="MxiansPage";
    this.newPost=false;
    this.adminService.getPages().subscribe((doc)=>{
      this.pages=doc;
   //  console.log(doc);
    });
  }
  PageSelector()
  {
    
    //console.log(this.selectedPage);
    this.getAllBlogs();
    
  }
  createNewBlogForm(){
    this.form=this.formBuilder.group({  
      title:['',Validators.compose([
       Validators.required,
       Validators.maxLength(30),
       Validators.minLength(5)
      ])],
      body:['',Validators.compose([
        Validators.required,
        Validators.maxLength(1000),
        Validators.minLength(5)
      ])],
      page:['', Validators.compose([
        Validators.required
      ])]
    })
  }
    newBlogForm()
  {
    this.newPost=true;
  }

  reloadingBlogs(){
    this.loadingBlogs=true;
    this.getAllBlogs();
    setTimeout(()=>{
      this.loadingBlogs=false;
    },4000);
  }

  onBlogSubmit(){
    this.processing=true;
    this.disableFormNewBlogForm();
    //console.log(this.form);
    //console.log(this.form.get('page').value)


    const blog={
      title:this.form.get('title').value,
      body:this.form.get('body').value,
      mxians : this.form.get('page').value,
      createdBy:this.username
    }

    console.log(blog);
    this.blogService.newBlog(blog).subscribe(data=>{
      if(!data['success'])
      {
        this.messageClass='alert alert-danger';
        this.message=data['message'];
        this.processing=false;
        this.enableFormNewBlogForm();

      }
      else{
        this.messageClass='alert alert-success';
        this.message=data['message'];
        this.getAllBlogs();
        setTimeout(()=>{
          this.newPost=false;
         
          this.processing=false;
      
           this.message=false;
      
          this.form.reset();
          this.enableFormNewBlogForm();
      },2000);
      }
    });
}
  goBack()
  {
    window.location.reload();
  }
  enableFormNewBlogForm()
  {
    this.form.get('title').enable();
    this.form.get('body').enable();
  }
  disableFormNewBlogForm()
  {
    this.form.get('title').disable();
    this.form.get('body').disable();
  }
  getAllBlogs(){
    this.blogService.getAllBlogs(this.selectedPage).subscribe(data=>{
      this.blogPosts=data['blog'];
     this.pageChoosed=true;  
    });
  }

}
