import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonLabel, IonNote, IonButtons, IonBackButton, 
  IonItemGroup, IonItemDivider, IonIcon 
} from '@ionic/angular/standalone';
import { Cart } from '../../services/cart';
import { addIcons } from 'ionicons';
import { receiptOutline, timeOutline, cashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
    IonItem, IonLabel, IonNote, IonButtons, IonBackButton, 
    IonItemGroup, IonItemDivider, IonIcon
  ]
})
export class HistoryPage implements OnInit {
  salesHistory: any[] = [];

  constructor(private cartService: Cart) {
    addIcons({ receiptOutline, timeOutline, cashOutline });
  }

  ngOnInit() {
    this.loadHistory();
  }

  // Se ejecuta cada vez que entras a la página para refrescar los datos
  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory() {
    this.salesHistory = this.cartService.getHistory();
    // Invertimos el orden para que la compra más reciente salga arriba
    this.salesHistory.reverse();
  }
}