import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Airport} from './airport.model';

@model()
export class Route extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;
  @property({
    type: 'string',
    required: true,
  })
  Time: string;

  @belongsTo(() => Airport, {name: 'OriginFK'})
  Origin: string;

  @belongsTo(() => Airport, {name: 'DestinyFK'})
  Destiny: string;

  constructor(data?: Partial<Route>) {
    super(data);
  }
}

export interface RouteRelations {
  // describe navigational properties here
}

export type RouteWithRelations = Route & RouteRelations;
