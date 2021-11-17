import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {service} from '@loopback/core';
import {AuthService} from '../services';
import axios from 'axios';
import {Credentiales} from '../models';
import { HttpErrors} from '@loopback/rest';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @service(AuthService)
    public servicioAuth: AuthService
  ) {}


   //Servicio de login
   @post('/login', {
    responses: {
      '200': {
        description: 'Identificación de usuarios'
      }
    }
  })
  async login(
    @requestBody() credenciales: Credentiales
  ) {
    let p = await this.servicioAuth.IdentificarPersona(credenciales.user, credenciales.password);
    if (p) {
      let token = this.servicioAuth.GenerarTokenJWT(p);
 
      return {
        status: "success",
        data: {
          nombre: p.Name,
          apellidos: p.lastName,
          correo: p.email,
          id: p.Id
        },
        token: token
      }
    } else {
      throw new HttpErrors[401]("Datos invalidos")
    }
  }


  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['Id'],
          }),
        },
      },
    })
    user: Omit<User, 'Id'>,
  ): Promise<User> {
    /* return this.userRepository.create(user); */
     //Nuevo
     let clave = this.servicioAuth.GenerarClave();
     let claveCifrada = this.servicioAuth.CifrarClave(clave);
     user.password = claveCifrada;
     let p = await this.userRepository.create(user);
    // Notifiamos al usuario por telefono y email 
         let destino1 = user.phone;
         let destino2 = user.email;
     
        let asunto = 'Registro de usuario en plataforma';
        let contenido = `Hola, ${user.Name} ${user.lastName} su contraseña en el portal es: ${clave}`
        axios({
          method: 'post',
          url: 'http://localhost:5000/send_sms',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            destino: destino1,
            contenido: contenido
          }
        }).then((data: any) => {
          console.log(data)
        }).catch((err: any) => {
          console.log(err)
        })
        axios({
          method: 'post',
          url: 'http://localhost:5000/send_email',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            destino: destino2,
            asunto: asunto,
            contenido: contenido
          }
        }).then((data: any) => {
          console.log(data)
        }).catch((err: any) => {
          console.log(err)})
        
    return p;
  }



  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  
}
