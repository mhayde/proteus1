import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Pago, PagoRelations, User, Cpago} from '../models';
import {UserRepository} from './user.repository';
import {CpagoRepository} from './cpago.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.idpago,
  PagoRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Pago.prototype.idpago>;

  public readonly cpagos: HasManyRepositoryFactory<Cpago, typeof Pago.prototype.idpago>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CpagoRepository') protected cpagoRepositoryGetter: Getter<CpagoRepository>,
  ) {
    super(Pago, dataSource);
    this.cpagos = this.createHasManyRepositoryFactoryFor('cpagos', cpagoRepositoryGetter,);
    this.registerInclusionResolver('cpagos', this.cpagos.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
