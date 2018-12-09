import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs';
import { Item } from './../../models/item/item.model';
import 'rxjs/add/operator/map';
import { RadioStreamProvider } from '../../providers/radio-stream/radio-stream';
import { MusicControls } from '@ionic-native/music-controls';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showButton : boolean;

  shoppingList$: Observable<Item[]>;

  constructor(public navCtrl: NavController, private shopping: ShoppingListService,public _player: RadioStreamProvider,
    private _musicControls: MusicControls) {
    this.shoppingList$ = this.shopping.getShoppingList().snapshotChanges().map(
      changes => {
        return changes.map(c=> ({
          key: c.payload.key, ...c.payload.val(),
          //.getShoppingList Returns Db List, snapshotChanges() returns key and value
        }));
      });
  }
  playStream(){
    console.log('Play Button clicked');
    this.showButton = true;
    this._player.playAudioProvider();
    this.startMusicControls();
  }

  stopStream(){
    console.log('Stop Button');
    this.showButton = false;
    this._player.pauseProvider();
    this._musicControls.updateIsPlaying(true);
    
  }

  startMusicControls(){
    this._musicControls.destroy(); // it's the same with or without the destroy 
    this._musicControls.create({
      track       : 'Radio Haryanvi',        // optional, default : ''
      artist      : '',                       // optional, default : ''
      cover       : '',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying   : true,                         // optional, default : true
      dismissable : true,                         // optional, default : false
    
      // hide previous/next/close buttons:
      hasPrev   : false,      // show previous button, optional, default: true
      hasNext   : false,      // show next button, optional, default: true
      hasClose  : true,       // show close button, optional, default: false
      hasSkipForward : false,  // show skip forward button, optional, default: false
      hasSkipBackward : false, // show skip backward button, optional, default: false
      skipForwardInterval: 0, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 0, // display number for skip backward, optional, default: 0
    // iOS only, optional
      album       : 'Radio Haryanvi',     // optional, default: ''
      duration : 0, // optional, default: 0
      elapsed : 0, // optional, default: 0
    
      // Android only, optional
      // text displayed in the status bar when the notific\ation (and the ticker) are updated
      ticker    : 'Now playing'
     });
     this._musicControls.subscribe().subscribe((action) => {
      console.log('action', action);
          const message = JSON.parse(action).message;
          console.log('message', message);
          switch(message) {
            case 'music-controls-next':
               // Do something
               break;
            case 'music-controls-previous':
               // Do something
               break;
            case 'music-controls-pause':
               // Do something
               console.log('music pause');
               this._player.pauseProvider();
               this._musicControls.listen(); 
               this._musicControls.updateIsPlaying(false);
               break;
            case 'music-controls-play':
               // Do something
               console.log('music play');
               
               this._player.playAudioProvider();
               this._musicControls.listen(); 
               this._musicControls.updateIsPlaying(true);
               break;
            case 'music-controls-destroy':
               // Do something
               break;
            // External controls (iOS only)
            case 'music-controls-toggle-play-pause' :
              // Do something
              break;
            case 'music-controls-seek-to':
              // Do something
              break;
            case 'music-controls-skip-forward':
              // Do something
              break;
            case 'music-controls-skip-backward':
              // Do something
              break;

              // Headset events (Android only)
              // All media button events are listed below
            case 'music-controls-media-button' :
                // Do something
                break;
            case 'music-controls-headset-unplugged':
                // Do something
                break;
            case 'music-controls-headset-plugged':
                // Do something
                break;
            default:
                break;
          }
    });
    this._musicControls.listen(); // activates the observable above
    this._musicControls.updateIsPlaying(true);
  }


}
