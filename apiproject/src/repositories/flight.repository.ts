import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Flight, FlightRelations, Route} from '../models';
import {RouteRepository} from './route.repository';

export class FlightRepository extends DefaultCrudRepository<
  Flight,
  typeof Flight.prototype.Id,
  FlightRelations
> {

  public readonly RouteFK: BelongsToAccessor<Route, typeof Flight.prototype.Id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RouteRepository') protected routeRepositoryGetter: Getter<RouteRepository>,
  ) {
    super(Flight, dataSource);
    this.RouteFK = this.createBelongsToAccessorFor('RouteFK', routeRepositoryGetter,);
    this.registerInclusionResolver('RouteFK', this.RouteFK.inclusionResolver);
  }
}
