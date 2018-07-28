import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class UsuarioProvider {
  
  

  constructor(
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private toastController: ToastController
  ) {
    console.log('Hello UsuarioProvider Provider');
  }

  alerta(titulo, subtitulo) {
    let alerta = this.alertController.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: ['Listo']
    });
    alerta.present();
  }
  toast(mensaje){
    let toast = this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  iniciarSesion(email, contraseña) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, contraseña)
        .then(resultado => {
          return resultado;
        });
  }

  iniciarSesionRedes(proveedor): any {
    if(proveedor == 'facebook'){
      this.afAuth.auth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider()
      );
    }
    if(proveedor == 'google'){
     return this.afAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      ).then( resultado => this.toast("Bienvenido"))
      .catch( error => {
        this.alerta("Error", error);
      })
      ;
    }
  }
  crearCuenta(email, contraseña) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, contraseña)
      .then(resultado => {
        this.toast("Usuario Creado");
        return resultado
      }
      )
      .catch(error => this.alerta("Error", error));
  }


}
