import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Cpago, CpagoRelations, Pago} from '../models';
import {PagoRepository} from './pago.repository';

export class CpagoRepository extends DefaultCrudRepository<
  Cpago,
  typeof Cpago.prototype.idcpago,
  CpagoRelations
> {

  public readonly pago: BelongsToAccessor<Pago, typeof Cpago.prototype.idcpago>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Cpago, dataSource);
    this.pago = this.createBelongsToAccessorFor('pago', pagoRepositoryGetter,);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
  }
}
