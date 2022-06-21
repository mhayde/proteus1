import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Usertype, UsertypeRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class UsertypeRepository extends DefaultCrudRepository<
  Usertype,
  typeof Usertype.prototype.idusertype,
  UsertypeRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Usertype.prototype.idusertype>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Usertype, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
