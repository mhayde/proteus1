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
  Pago,
  Cpago,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoCpagoController {
  constructor(
    @repository(PagoRepository) protected pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/cpagos', {
    responses: {
      '200': {
        description: 'Array of Pago has many Cpago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cpago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cpago>,
  ): Promise<Cpago[]> {
    return this.pagoRepository.cpagos(id).find(filter);
  }

  @post('/pagos/{id}/cpagos', {
    responses: {
      '200': {
        description: 'Pago model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cpago)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pago.prototype.idpago,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cpago, {
            title: 'NewCpagoInPago',
            exclude: ['idcpago'],
            optional: ['pagoId']
          }),
        },
      },
    }) cpago: Omit<Cpago, 'idcpago'>,
  ): Promise<Cpago> {
    return this.pagoRepository.cpagos(id).create(cpago);
  }

  @patch('/pagos/{id}/cpagos', {
    responses: {
      '200': {
        description: 'Pago.Cpago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cpago, {partial: true}),
        },
      },
    })
    cpago: Partial<Cpago>,
    @param.query.object('where', getWhereSchemaFor(Cpago)) where?: Where<Cpago>,
  ): Promise<Count> {
    return this.pagoRepository.cpagos(id).patch(cpago, where);
  }

  @del('/pagos/{id}/cpagos', {
    responses: {
      '200': {
        description: 'Pago.Cpago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cpago)) where?: Where<Cpago>,
  ): Promise<Count> {
    return this.pagoRepository.cpagos(id).delete(where);
  }
}
