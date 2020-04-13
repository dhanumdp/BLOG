import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../services/auth.Service';
import {BlogService} from '../services/blog.service';
import {AdminservicesService} from '../services/adminservices.service'

import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { NavbarService } from '../services/navbar.service';

import {
  FileSelectDirective,
  FileDropDirective,
  FileUploader
} from "ng2-file-upload";

import {saveAs} from 'file-saver'



const URL = 'http://localhost:3000/blog/uploadPhoto';

const path = 'http://localhost:3000/blog/public/uploads';


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
  complete : boolean;
  deletePostId:any;
  foundBlog:boolean;
  message;

  file:string;
  uploader : FileUploader;
  urldata : string;
  imgurl : string;
  newPost:boolean;
  mainPage:boolean;
  editPost:boolean;
  deletePost:boolean;
  postId:any;
  selectedBlog:any;
  //newImage=false;
  loadingBlogs=false;
  pages=[];
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
    private nav : NavbarService,
    private adminService : AdminservicesService
   
  ) {
      this.createNewBlogForm();
      this.uploader = new FileUploader({ url: URL, itemAlias: "photo" });
   }

  ngOnInit() {
    this.nav.hide();
    this.mainPage=true;
    this.newPost=false;
    this.complete=false;
    this.deletePost=false;
    this.editPost=false;
    this.username=localStorage.getItem('user');
    //this.getAllBlogs();
    this.selectedPage="MxiansPage"
    this.pageChoosed=false;
    this.getAllBlogs();
    //this.selectedPage="MxiansPage";
    this.newPost=false;
    this.adminService.getPages().subscribe((doc)=>{
      this.pages.push(doc);
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      window.document.getElementById("uploadimage").style.visibility="visible"
     
    };
    this.uploader.onCompleteItem = (
      item: any,
      res: any,
      status: any,
      headers: any
    ) => {
      //console.log(res);
      this.urldata = res;
      this.imgurl = path + "/" + res;
     //this.blogPosts['photo']=this.imgurl;
     
     this.file=this.imgurl;
     this.complete=true;

     setTimeout(()=>{
       this.complete=false;
     },1000); 
      //  this.downloadFile=this.imgurl;
      // this.studentService.stud.Photo=this.imgurl;
      //console.log(this.imgurl);
    };
    


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
      ])],
      file : ["", Validators.compose([])]

    })
  }
    newBlogForm()
  {
    
    this.mainPage=false;
    this.newPost=true;
    this.deletePost=false;
    this.editPost=false;
  }

  reloadingBlogs(){
    this.loadingBlogs=true;
    this.getAllBlogs();
    setTimeout(()=>{
      this.loadingBlogs=false;
    },2000);
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
      createdBy:this.username,
      file : this.file
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
          this.goBack();
          this.enableFormNewBlogForm();
      },1000);
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

  onEdit(emp,id)
  {
    this.mainPage=false;
    this.newPost=false;
    this.editPost=true;
    this.deletePost=false;
    this.postId=id;
    this.selectedBlog=emp;
    console.log(this.selectedBlog);
     
  }

  updateBlogSubmit(){
    this.processing=true;

   let upBlog={
        title:this.selectedBlog.title,
        body : this.selectedBlog.body,
        page:this.selectedPage,
        file : this.file,
        id:this.postId
    }
    console.log(upBlog);
    this.blogService.updateBlog(upBlog).subscribe(data=>{
      if(!data['success'])
      {
        this.messageClass='alert alert-danger';
        this.message=data['message'];
        this.processing=false;
      }
      this.messageClass='alert alert-success';
      this.message=data['message'];
      setTimeout(()=>{
        this.goBack();

      },1000);
    })

  
  }
  onDelete(blog,id)
  {
    this.selectedBlog=blog;
    this.deletePostId=id;
    console.log(this.selectedBlog)
    //this.processing=true;
    
    this.deletePost=true;
    this.mainPage=false;
    this.newPost=false;
    this.foundBlog=true;
    this.editPost=false;
  }

  deleteBlog()
  {
    
    let page={
      id:this.deletePostId,
      page:this.selectedPage
    }
    console.log(page);
    this.blogService.deleteBlog(this.deletePostId,page).subscribe((data)=>{
      if(!data['success'])
      {
        this.messageClass='alert alert-danger';
        this.message=data['message'];
        this.processing=false;
      }
      this.messageClass='alert alert-success';
      this.message=data['message'];
      setTimeout(()=>{
         this.goBack()

      },1000);
    })

  }

  download(file, title)
  {
    saveAs(file, title+"_Attachment");
  }

}
