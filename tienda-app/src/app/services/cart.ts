import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cart: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem('my_cart');
    if (savedCart) this.cart = JSON.parse(savedCart);
  }

  getCart() {
    return this.cart;
  }

  addProduct(product: any) {
    this.cart.push(product);
    this.saveCart();
  }

  removeProduct(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('my_cart', JSON.stringify(this.cart));
  }

  // --- LÓGICA DEL HISTORIAL ---
  saveToHistory(items: any[], total: number) {
    const sale = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      products: [...items],
      total: total
    };
    const history = this.getHistory();
    history.push(sale);
    localStorage.setItem('my_history', JSON.stringify(history));
  }

  getHistory() {
    const saved = localStorage.getItem('my_history');
    return saved ? JSON.parse(saved) : [];
  }
}