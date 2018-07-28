import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email
  loginPage = 'LoginPage';
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private camara: Camera
  ) {
      afAuth.authState.subscribe(usuario =>
        {
          if(usuario){
            this.email = usuario.email;
          }
          console.log("usuario", usuario)
        }
      )
  }

  iniciarSesionFacebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(resultado => console.log(resultado));
  }

  obtenerFoto(){
    let opcionesCamara: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.DATA_URL,
      mediaType: this.camara.MediaType.PICTURE,
      sourceType: this.camara.PictureSourceType.CAMERA,
      encodingType: this.camara.EncodingType.JPEG
    }
    this.camara.getPicture(opcionesCamara)
    .then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });;
  }
}
