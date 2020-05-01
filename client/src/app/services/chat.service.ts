import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import { format } from 'url';

@Injectable({
    providedIn: 'root'
})

export class ChatService{

    private socket = io('http://localhost:3001');
    constructor( private http : HttpClient) { }
    joinRoom(data)
    {
        this.socket.emit('join',data);
        this.socket.emit('notifyUserAfterJoining',data);
    }

    // notifyUserAfterJoining(data)
    // {

    //     let observable = new Observable<{user:"",message:String}>(observer=>{
    //         this.socket.on('joined grp', (data)=>{
    //             observer.next(data);
    //         });
    //         return () => {this.socket.disconnect();}
    //     });

    //     return observable;

    // }

    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){

       this.socket.emit('leave',data);
       this.socket.emit('notifyUserAfterLeaving',data);
    }

    // notifyUserAfterLeaving(data)
    // {

    //     let observable = new Observable<{user:"",message:String}>(observer=>{
    //         this.socket.on('left grp', (data)=>{
    //             observer.next(data);
    //         });
    //         return () => {this.socket.disconnect();}
    //     });

    //     return observable;

    // }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left the group', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    
  getGroups()
  {
    return this.http.get('https://mxiansportal.azurewebsites.net/chat/getGroups');
  }
}
