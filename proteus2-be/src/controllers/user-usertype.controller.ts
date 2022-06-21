import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Usertype,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUsertypeController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/usertype', {
    responses: {
      '200': {
        description: 'Usertype belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usertype)},
          },
        },
      },
    },
  })
  async getUsertype(
    @param.path.string('id') id: typeof User.prototype.iduser,
  ): Promise<Usertype> {
    return this.userRepository.usertype(id);
  }
}
