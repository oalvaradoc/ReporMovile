import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario = {
    email: "",
    password1: ""
  }
  paginaRegistro= 'RegistroPage';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private servicioUsuarios: UsuarioProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  iniciarSesion(){
    this.servicioUsuarios
      .iniciarSesion(this.usuario.email, this.usuario.password1)
      .then(resultado => {
        this.navCtrl.push(HomePage);
      });
  }

  iniciarSesionRedes(proveedor){
    this.servicioUsuarios.iniciarSesionRedes(proveedor)
      .then(resultado => this.navCtrl.push(HomePage))
      .catch();
  }
}
