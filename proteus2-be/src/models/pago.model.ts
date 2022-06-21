import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {Cpago} from './cpago.model';

@model()
export class Pago extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idpago?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  periodopagado: string;


  /*@property({
    type: 'string',
    required: true,
  })
  iduser: string;
*/
  @hasMany(() => Cpago)
  cpagos: Cpago[];
  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
