import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, Response, ResponseOptions, BaseRequestOptions, RequestOptions, ConnectionBackend } from '@angular/http';
import { ReflectiveInjector } from '@angular/core';

import { HeroService } from './hero.service';
import { Hero } from './hero' ;

/*https://angular.io/api/http/testing/MockBackend*/

describe('HeroService', () => {

  const mockResponse = [
    {id: 0, name: 'Batman'},
    {id: 2, name: 'Superman'}
  ];

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      HeroService
    ]);

    this.heroService = this.injector.get(HeroService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('should query current service url', () => {
    this.heroService.getHeroes();
    expect(this.lastConnection).toBeDefined();
    expect(this.lastConnection.request.url).toBe('api/heroes');
  });

  it('getHeroes() should return heroes', fakeAsync(() => {

    let result: Hero[];

    this.heroService.getHeroes().then((heroes) => result = heroes);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({data: mockResponse})
    })));

    tick();
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(0);
    expect(result[0].name).toBe('Batman');

  }));

  /*it('delete() should delete a hero', fakeAsync(() => {
    ???
  }));*/



});
