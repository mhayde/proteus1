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
import {Usertype} from '../models';
import {UsertypeRepository} from '../repositories';

export class UsertypeController {
  constructor(
    @repository(UsertypeRepository)
    public usertypeRepository : UsertypeRepository,
  ) {}

  @post('/usertypes')
  @response(200, {
    description: 'Usertype model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usertype)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usertype, {
            title: 'NewUsertype',
            exclude: ['idusertype'],
          }),
        },
      },
    })
    usertype: Omit<Usertype, 'idusertype'>,
  ): Promise<Usertype> {
    return this.usertypeRepository.create(usertype);
  }

  @get('/usertypes/count')
  @response(200, {
    description: 'Usertype model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usertype) where?: Where<Usertype>,
  ): Promise<Count> {
    return this.usertypeRepository.count(where);
  }

  @get('/usertypes')
  @response(200, {
    description: 'Array of Usertype model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usertype, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usertype) filter?: Filter<Usertype>,
  ): Promise<Usertype[]> {
    return this.usertypeRepository.find(filter);
  }

  @patch('/usertypes')
  @response(200, {
    description: 'Usertype PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usertype, {partial: true}),
        },
      },
    })
    usertype: Usertype,
    @param.where(Usertype) where?: Where<Usertype>,
  ): Promise<Count> {
    return this.usertypeRepository.updateAll(usertype, where);
  }

  @get('/usertypes/{id}')
  @response(200, {
    description: 'Usertype model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usertype, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usertype, {exclude: 'where'}) filter?: FilterExcludingWhere<Usertype>
  ): Promise<Usertype> {
    return this.usertypeRepository.findById(id, filter);
  }

  @patch('/usertypes/{id}')
  @response(204, {
    description: 'Usertype PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usertype, {partial: true}),
        },
      },
    })
    usertype: Usertype,
  ): Promise<void> {
    await this.usertypeRepository.updateById(id, usertype);
  }

  @put('/usertypes/{id}')
  @response(204, {
    description: 'Usertype PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usertype: Usertype,
  ): Promise<void> {
    await this.usertypeRepository.replaceById(id, usertype);
  }

  @del('/usertypes/{id}')
  @response(204, {
    description: 'Usertype DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usertypeRepository.deleteById(id);
  }
}
