import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, Response, ResponseOptions, BaseRequestOptions, RequestOptions, ConnectionBackend } from '@angular/http';
import { ReflectiveInjector } from '@angular/core';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero' ;

/*https://angular.io/api/http/testing/MockBackend*/

describe('HeroSearchService', () => {

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      HeroSearchService
    ]);

    this.heroSearchService = this.injector.get(HeroSearchService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('should query current service url', () => {
    this.heroSearchService.search('man');
    expect(this.lastConnection).toBeDefined();
    expect(this.lastConnection.request.url).toBe('api/heroes/?name=man');
  });

});
