import { Injectable } from '@angular/core';

@Injectable()
export class RadioStreamProvider {

  url:string;
  stream:any;
  promise:any;

  constructor(
    
  ) {

    //
    this.url = "http://weareharyanvi.com:8000/listen";
    //
    this.stream = new Audio(this.url);
  }

  playAudioProvider(){
    //
    this.stream.play();
    //
    this.promise = new Promise((resolve,reject) => {
     this.stream.addEventListener('playing', () => {
       resolve(true);
     });

     this.stream.addEventListener('error', () => {
       reject(false);
     });
   });
   
  return this.promise;
};

  //
  pauseProvider() {
    this.stream.pause();
  };

}