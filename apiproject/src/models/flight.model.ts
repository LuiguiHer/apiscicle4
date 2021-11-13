import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Route} from './route.model';

@model()
export class Flight extends Entity {
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
  startDate: string;

  @property({
    type: 'string',
    required: true,
  })
  endDate: string;

  @property({
    type: 'string',
    required: true,
  })
  startHour: string;

  @property({
    type: 'string',
    required: true,
  })
  endHour: string;

  @property({
    type: 'number',
    required: true,
  })
  boughtSeats: number;

  @property({
    type: 'string',
    required: true,
  })
  pilotName: string;

  @belongsTo(() => Route, {name: 'RouteFK'})
  Route: string;

  constructor(data?: Partial<Flight>) {
    super(data);
  }
}

export interface FlightRelations {
  // describe navigational properties here
}

export type FlightWithRelations = Flight & FlightRelations;
