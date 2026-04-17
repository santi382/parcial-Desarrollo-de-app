import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, 
  IonLabel, IonInput, IonButton, IonText, IonButtons, 
  IonCard, IonCardContent, IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, cartOutline, personAddOutline, logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // <--- REVISA QUE ESTO ESTÉ ASÍ
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, 
    IonLabel, IonInput, IonButton, IonText, IonButtons, 
    IonCard, IonCardContent, IonIcon
  ]
})
export class LoginPage {
  isLogin = true; 

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private navCtrl: NavController, 
    private toastController: ToastController
  ) {
    addIcons({ 
      'mail-outline': mailOutline, 
      'lock-closed-outline': lockClosedOutline, 
      'cart-outline': cartOutline,
      'person-add-outline': personAddOutline,
      'log-in-outline': logInOutline
    });
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.authForm.reset();
  }

  async onSubmit() {
    console.log("¡Click detectado en onSubmit!"); 

    if (this.authForm.invalid) {
      this.presentToast('Por favor llena los campos correctamente (Password min 6)', 'warning');
      return;
    }

    const { email, password } = this.authForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (this.isLogin) {
      // --- LÓGICA DE LOGIN ---
      const userFound = users.find((u: any) => u.email === email && u.password === password);
      if (userFound) {
        this.navCtrl.navigateRoot('/home');
      } else {
        this.presentToast('Usuario no encontrado o clave incorrecta', 'danger');
      }
    } else {
      // --- LÓGICA DE REGISTRO ---
      const alreadyExists = users.find((u: any) => u.email === email);
      if (alreadyExists) {
        this.presentToast('Ese correo ya está registrado', 'warning');
      } else {
        // 1. Guardamos el usuario
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        // 2. Mostramos el mensaje de éxito
        this.presentToast('¡Registrado! Ahora inicia sesión', 'success');
        
        // 3. CAMBIOS AQUÍ:
        this.isLogin = true;    // Cambia la pestaña a "Bienvenido"
        this.authForm.reset();  // LIMPIA LAS BARRAS (las deja en blanco)
      }
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}