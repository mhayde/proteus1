import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {User, UserRelations, Usertype, Pago} from '../models';
import {UsertypeRepository} from './usertype.repository';
import {PagoRepository} from './pago.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.iduser,
  UserRelations
> {

  public readonly usertype: BelongsToAccessor<Usertype, typeof User.prototype.iduser>;

  public readonly pagos: HasManyRepositoryFactory<Pago, typeof User.prototype.iduser>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('UsertypeRepository') protected usertypeRepositoryGetter: Getter<UsertypeRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(User, dataSource);
    this.pagos = this.createHasManyRepositoryFactoryFor('pagos', pagoRepositoryGetter,);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
    this.usertype = this.createBelongsToAccessorFor('usertype', usertypeRepositoryGetter,);
    this.registerInclusionResolver('usertype', this.usertype.inclusionResolver);
  }
}
