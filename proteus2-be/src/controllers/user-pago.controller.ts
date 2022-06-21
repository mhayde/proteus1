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
  User,
  Pago,
} from '../models';
import {UserRepository} from '../repositories';

export class UserPagoController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of User has many Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.userRepository.pagos(id).find(filter);
  }

  @post('/users/{id}/pagos', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.iduser,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInUser',
            exclude: ['idpago'],
            optional: ['userId']
          }),
        },
      },
    }) pago: Omit<Pago, 'idpago'>,
  ): Promise<Pago> {
    return this.userRepository.pagos(id).create(pago);
  }

  @patch('/users/{id}/pagos', {
    responses: {
      '200': {
        description: 'User.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.userRepository.pagos(id).patch(pago, where);
  }

  @del('/users/{id}/pagos', {
    responses: {
      '200': {
        description: 'User.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.userRepository.pagos(id).delete(where);
  }
}
