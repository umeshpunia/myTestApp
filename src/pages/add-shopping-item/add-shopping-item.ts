import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from './../../models/item/item.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html',
})
export class AddShoppingItemPage {
  item: Item = {
    name: '',
    mobile: undefined,
    city: '',
    request: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private shopping: ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }

  addItem(item: Item){
    this.shopping.addItem(item).then( ref => {
      this.navCtrl.setRoot('HomePage', { key: ref.key })
    });
  }

}
