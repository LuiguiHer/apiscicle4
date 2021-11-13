import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Airport, AirportRelations} from '../models';

export class AirportRepository extends DefaultCrudRepository<
  Airport,
  typeof Airport.prototype.Id,
  AirportRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Airport, dataSource);
  }
}
