import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  usuario = {
    email: "",
    password1: "",
    password2: ""
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private servicioUsuarios: UsuarioProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  crearCuenta(){
    if(this.usuario.password1 !== this.usuario.password2){
      this.servicioUsuarios.alerta("Error Contraseña", "Las contraseñas no coinciden");
      this.usuario.password1= "";
      this.usuario.password2= "";
    }else{
      this.servicioUsuarios.crearCuenta(this.usuario.email, this.usuario.password1)
       .then( resultado => {
         this.servicioUsuarios.iniciarSesion(this.usuario.email, this.usuario.password1)
          .then(rel => this.navCtrl.push(HomePage));
        
       });
    }
  }
  
  
  
}
