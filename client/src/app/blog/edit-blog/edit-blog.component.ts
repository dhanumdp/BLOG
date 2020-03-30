import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import {Location} from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message;
  messageClass;
  blog={
    title:String,
    body:String
  }

  currentUrl;
  processing=false;
  constructor(
     private location:Location,
    private activatedRoute:ActivatedRoute,
    private blogService:BlogService,
    private router:Router

  ) { }
  updateBlogSubmit(){
    this.processing=true;
    this.blogService.updateBlog(this.blog).subscribe(data=>{
      if(!data['success'])
      {
        this.messageClass='alert alert-danger';
        this.message=data['message'];
        this.processing=false;
      }
      this.messageClass='alert alert-success';
      this.message=data['message'];
      setTimeout(()=>{
        this.router.navigate(['/blog']);

      },2000);
    })

  }
  goBack()
  {
   this.location.back();
  }

 
  ngOnInit() {
    this.currentUrl=this.activatedRoute.snapshot.params;
    this.blogService.getSingleBlogs(this.currentUrl.id).subscribe(data=>{
      // this.blog=data['blog'];
      console.log(data);
    });
  }

}
