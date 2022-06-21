import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pago} from './pago.model';

@model()
export class Cpago extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idcpago?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @belongsTo(() => Pago)
  pagoId: string;

  constructor(data?: Partial<Cpago>) {
    super(data);
  }
}

export interface CpagoRelations {
  // describe navigational properties here
}

export type CpagoWithRelations = Cpago & CpagoRelations;
