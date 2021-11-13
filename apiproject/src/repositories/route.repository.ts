import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Route, RouteRelations, Airport} from '../models';
import {AirportRepository} from './airport.repository';

export class RouteRepository extends DefaultCrudRepository<
  Route,
  typeof Route.prototype.Id,
  RouteRelations
> {

  public readonly OriginFK: BelongsToAccessor<Airport, typeof Route.prototype.Id>;

  public readonly DestinyFK: BelongsToAccessor<Airport, typeof Route.prototype.Id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AirportRepository') protected airportRepositoryGetter: Getter<AirportRepository>,
  ) {
    super(Route, dataSource);
    this.DestinyFK = this.createBelongsToAccessorFor('DestinyFK', airportRepositoryGetter,);
    this.registerInclusionResolver('DestinyFK', this.DestinyFK.inclusionResolver);
    this.OriginFK = this.createBelongsToAccessorFor('OriginFK', airportRepositoryGetter,);
    this.registerInclusionResolver('OriginFK', this.OriginFK.inclusionResolver);
  }
}
