import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generator = require("password-generator");
const cryptoJS = require("crypto-js");
import {config} from '../config/config';
import {User} from '../models';
const jwt = require('jsonwebtoken');
import {UserRepository} from '../repositories';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT}
  )
export class AuthService {
  constructor(/* Add @inject to inject parameters */
    @repository(UserRepository)
  public userRepository: UserRepository
    ) {}

  /*
   * Add service methods here
   */
  GenerarClave() {
    let clave = generator(8, false);
    return clave;
  }
  
  CifrarClave(clave: String) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  //JWT
  GenerarTokenJWT(User: User) {
    let token = jwt.sign({
      data: {
        id: User.Id,
        correo: User.email,
        nombre: User.Name + " " + User.lastName
      }
    }, config.claveJWT)
 
    return token
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, config.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }

  //Autenticacion
  IdentificarPersona(email: string, password: string) {
    try {
      let p = this.userRepository.findOne({where: {email: email, password: password}})
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }



}
