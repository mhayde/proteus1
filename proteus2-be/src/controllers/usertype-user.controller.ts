import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usertype,
  User,
} from '../models';
import {UsertypeRepository} from '../repositories';

export class UsertypeUserController {
  constructor(
    @repository(UsertypeRepository) protected usertypeRepository: UsertypeRepository,
  ) { }

  @get('/usertypes/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Usertype has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.usertypeRepository.users(id).find(filter);
  }

  @post('/usertypes/{id}/users', {
    responses: {
      '200': {
        description: 'Usertype model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usertype.prototype.idusertype,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInUsertype',
            exclude: ['iduser'],
            optional: ['usertypeId']
          }),
        },
      },
    }) user: Omit<User, 'iduser'>,
  ): Promise<User> {
    return this.usertypeRepository.users(id).create(user);
  }

  @patch('/usertypes/{id}/users', {
    responses: {
      '200': {
        description: 'Usertype.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.usertypeRepository.users(id).patch(user, where);
  }

  @del('/usertypes/{id}/users', {
    responses: {
      '200': {
        description: 'Usertype.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.usertypeRepository.users(id).delete(where);
  }
}
