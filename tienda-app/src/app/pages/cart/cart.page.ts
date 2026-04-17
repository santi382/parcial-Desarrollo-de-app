import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonThumbnail, IonLabel, IonItemSliding, IonItemOptions, 
  IonItemOption, IonFooter, IonButton, IonNote, IonImg, 
  IonButtons, IonBackButton, IonIcon 
} from '@ionic/angular/standalone';
import { Cart } from '../../services/cart';
import { addIcons } from 'ionicons';
import { trash, cart, addCircle, receiptOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
    IonThumbnail, IonLabel, IonItemSliding, IonItemOptions, 
    IonItemOption, IonFooter, IonButton, IonNote, IonImg, 
    IonButtons, IonBackButton, IonIcon
  ]
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: Cart) { 
    addIcons({ trash, cart, 'add-circle': addCircle, 'receipt-outline': receiptOutline });
  }

  ngOnInit() { this.loadItems(); }

  ionViewWillEnter() { this.loadItems(); }

  loadItems() {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  removeItem(index: number) {
    this.cartService.removeProduct(index);
    this.loadItems();
  }

  async checkout() {
    if (this.cartItems.length > 0) {
      // Guardamos en el historial antes de limpiar
      this.cartService.saveToHistory(this.cartItems, this.total);
      
      alert('¡Compra exitosa! Guardada en el historial.');
      this.cartService.clearCart();
      this.loadItems();
    }
  }
}