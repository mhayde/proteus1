import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cpago,
  Pago,
} from '../models';
import {CpagoRepository} from '../repositories';

export class CpagoPagoController {
  constructor(
    @repository(CpagoRepository)
    public cpagoRepository: CpagoRepository,
  ) { }

  @get('/cpagos/{id}/pago', {
    responses: {
      '200': {
        description: 'Pago belonging to Cpago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async getPago(
    @param.path.string('id') id: typeof Cpago.prototype.idcpago,
  ): Promise<Pago> {
    return this.cpagoRepository.pago(id);
  }
}
