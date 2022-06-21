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
import {Cpago} from '../models';
import {CpagoRepository} from '../repositories';

export class CpagoController {
  constructor(
    @repository(CpagoRepository)
    public cpagoRepository : CpagoRepository,
  ) {}

  @post('/cpagos')
  @response(200, {
    description: 'Cpago model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cpago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cpago, {
            title: 'NewCpago',
            exclude: ['idcpago'],
          }),
        },
      },
    })
    cpago: Omit<Cpago, 'id'>,
  ): Promise<Cpago> {
    return this.cpagoRepository.create(cpago);
  }

  @get('/cpagos/count')
  @response(200, {
    description: 'Cpago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cpago) where?: Where<Cpago>,
  ): Promise<Count> {
    return this.cpagoRepository.count(where);
  }

  @get('/cpagos')
  @response(200, {
    description: 'Array of Cpago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cpago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cpago) filter?: Filter<Cpago>,
  ): Promise<Cpago[]> {
    return this.cpagoRepository.find(filter);
  }

  @patch('/cpagos')
  @response(200, {
    description: 'Cpago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cpago, {partial: true}),
        },
      },
    })
    cpago: Cpago,
    @param.where(Cpago) where?: Where<Cpago>,
  ): Promise<Count> {
    return this.cpagoRepository.updateAll(cpago, where);
  }

  @get('/cpagos/{id}')
  @response(200, {
    description: 'Cpago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cpago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cpago, {exclude: 'where'}) filter?: FilterExcludingWhere<Cpago>
  ): Promise<Cpago> {
    return this.cpagoRepository.findById(id, filter);
  }

  @patch('/cpagos/{id}')
  @response(204, {
    description: 'Cpago PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cpago, {partial: true}),
        },
      },
    })
    cpago: Cpago,
  ): Promise<void> {
    await this.cpagoRepository.updateById(id, cpago);
  }

  @put('/cpagos/{id}')
  @response(204, {
    description: 'Cpago PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cpago: Cpago,
  ): Promise<void> {
    await this.cpagoRepository.replaceById(id, cpago);
  }

  @del('/cpagos/{id}')
  @response(204, {
    description: 'Cpago DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cpagoRepository.deleteById(id);
  }
}
