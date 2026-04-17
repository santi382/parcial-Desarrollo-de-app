import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonSearchbar, IonNote, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButtons, IonCard } from '@ionic/angular/standalone';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { Cart } from '../services/cart';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonSearchbar, IonNote, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, CommonModule, RouterModule, IonButtons, IonCard],
})
export class HomePage implements OnInit {
 products: any[] = [];
 filteredProducts: any[] = [];


  constructor(private api: Api, 
    private cart: Cart) {}

  ngOnInit() {
    this.api.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterProducts(event: any) {
    const text = event.target.value.toLowerCase();
      if (text && text.trim() !== '') {
        this.filteredProducts = this.products.filter((p) =>
          p.title.toLowerCase().includes(text)
        );
      } else {
        this.filteredProducts = [...this.products];
      }}


      addTocart(product: any) {
        this.cart.addProduct(product);
        console.log('carrito actualizado:', this.cart.getCart());
        alert('Producto agregado al carrito');
      }
}

