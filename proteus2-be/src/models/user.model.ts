import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usertype} from './usertype.model';
import {Pago} from './pago.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  iduser?: string;

  @property({
    type: 'string',
    required: true,
  })
  ncedula: string;

  @property({
    type: 'string',
    required: true,
  })
  cname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  ntelefono: string;

  @property({
    type: 'string',
    required: true,
  })
  ncasa?: string;

  @belongsTo(() => Usertype)
  usertypeId: string;

  @hasMany(() => Pago)
  pagos: Pago[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
