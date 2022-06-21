import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Usertype extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idusertype?: string;

  @property({
    type: 'string',
    required: true,
  })
  usertypename: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Usertype>) {
    super(data);
  }
}

export interface UsertypeRelations {
  // describe navigational properties here
}

export type UsertypeWithRelations = Usertype & UsertypeRelations;
