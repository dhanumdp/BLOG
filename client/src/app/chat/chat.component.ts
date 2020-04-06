import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service'
import {Router} from '@angular/router'
import {ResourceLoader} from '@angular/compiler'
import {HttpClient} from '@angular/common/http'
import{FormGroup} from '@angular/forms'

//import { setTimeout } from 'timers';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[ChatService]
})
export class ChatComponent implements OnInit {
  form: FormGroup;
  joined : boolean;
  user:String;
  room : String;
  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];
  messageArray2:Array<{user:String,message:String}> = [];
  msg ={};
  group = [];
  constructor(private _chatService:ChatService, private http : HttpClient, private router : Router){
    this._chatService.newUserJoined()
    .subscribe(data=> this.messageArray.push(data)
    );
     this._chatService.userLeftRoom()
     .subscribe(data=>this.messageArray.push(data));
    this._chatService.newMessageReceived()
    .subscribe(data=>this.messageArray.push(data));
    this._chatService.getGroups().subscribe((res)=>{
      this.group.push(res);
    })
   }
   join(){
     
    this.messageArray=[];
    this._chatService.joinRoom({user:this.user, room:this.room});
    //  this._chatService.notifyUserAfterJoining({ room:this.room}).subscribe(data =>{
    //    this.messageArray.push(data);
    //  })
    this.joined=true;

 
     this.http.get(`http://localhost:3000/${this.room}`).subscribe((res)=>{
      console.log(res);
      this.msg=(res);
      // this.msg.forEach(element => {
      //   console.log(element);
      // });
  
      let msga=[]
      msga.push(this.msg); // just pushed the json into array for finding how many messages
      //console.log(msga[0].length); //for finding how many messages
      for(var i = 0; i< msga[0].length; i++ )
      {
        //console.log(this.msg[i].user);
  
        var data ={
          user : '['+this.msg[i].sentTime+'] '+this.msg[i].user,
          message : this.msg[i].msg
        }
        this.messageArray.push(data);//orginal msgbox in chat box
        this.messageArray2.push(data)//testing
      }
     // console.log(this.messageArray2);
    })
   
   
    // this.messageArray.pop();
    this.timeOUt();
}

timeOUt()
{
  setTimeout(() => {
    this.joined=false
  },1500);
}

leave(){

    this._chatService.leaveRoom({user:this.user, room:this.room});

    // this._chatService.notifyUserAfterLeaving({ room:this.room}).subscribe(data =>{
    //   this.messageArray.push(data);
    // })

    var inputs=window.document.getElementsByTagName('input');
    
    var selector = window.document.getElementsByTagName('select');
    selector[0].value="";
    this.messageArray=[];
    
    //  this.messageArray.pop();
}
sendMessage()
{
  // $('textarea').filter('[id*=msgbox]').val('');
  // window.document.msgbox.value
  var area =window.document.getElementsByTagName('textarea');
  area[0].value="";
    this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    this.messageText="";
}


  ngOnInit(): void {

    this.joined=false;
    this.user=localStorage.getItem('user');
     this.messageArray.pop();
this.messageText=""
    var inputs=window.document.getElementsByTagName('input');
  for(let i=0;i<inputs.length;i++){
    inputs[i].disabled=false;
    }   
  }

}
