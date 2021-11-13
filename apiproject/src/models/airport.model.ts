import {Entity, model, property} from '@loopback/repository';

@model()
export class Airport extends Entity {
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
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  City: string;

  @property({
    type: 'string',
    required: true,
  })
  Country: string;

  /* @property({
    type: 'string',
  })
  CoordX?: string; */
  
  @property({
    type: 'string',
    required: true,
  })
  CoordX: string;

  @property({
    type: 'string',
    required: true,
  })
  CoordY: string;

  @property({
    type: 'string',
    required: true,
  })
  Acronym: string;

  @property({
    type: 'string',
    required: true,
  })
  Type: string;


  constructor(data?: Partial<Airport>) {
    super(data);
  }
}

export interface AirportRelations {
  // describe navigational properties here
}

export type AirportWithRelations = Airport & AirportRelations;
