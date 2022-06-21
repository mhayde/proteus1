import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  User,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoUserController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Pago.prototype.idpago,
  ): Promise<User> {
    return this.pagoRepository.user(id);
  }
}
