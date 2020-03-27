import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../services/auth.Service';
import {BlogService} from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  processing=false;
  messageClass;
  message;
  newPost=false;
  //newImage=false;
  loadingBlogs=false;
  form : FormGroup;
  username;
  //uploader : FileUploader;
  //imagePreview:string;
  
  blogPosts;
  url="";

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private blogService:BlogService,
   
  ) {

   }


  ngOnInit() {
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
    const blog={
      title:this.form.get('title').value,
      body:this.form.get('body').value,
      createdBy:this.username
    }
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
    this.blogService.getAllBlogs().subscribe(data=>{
    this.blogPosts=data['blog'];

    });
  }

}
