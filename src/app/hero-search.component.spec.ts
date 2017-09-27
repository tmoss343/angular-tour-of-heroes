import { element } from 'protractor';
import { ComponentFixture, async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeroSearchComponent } from './hero-search.component';
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

describe('HeroSearchComponent', () => {

  let comp: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroSearchService: HeroSearchService;
  let spy: any;

  const mockHeroes: Hero[] =  [
    {id: 1, name: 'Batman'},
    {id: 2, name: 'Superman'},
    {id: 3, name: 'Iron Man'},
    {id: 7, name: 'Wonder Woman'}
  ];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        HeroSearchService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpModule
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    comp = fixture.componentInstance;

    heroSearchService = fixture.debugElement.injector.get(HeroSearchService);
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  it('should list search results', fakeAsync(() => {
    spy = spyOn(heroSearchService, 'search').and.returnValue(Observable.of(mockHeroes));
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#search-box'));
    input.nativeElement.value = 'man';
    input.triggerEventHandler('keyup', null);

    tick(300);
    fixture.detectChanges();

    const results = fixture.debugElement.queryAll(By.css('.search-result'));

    expect(results.length).toBe(4);
    expect(results[0].nativeElement.textContent.trim()).toBe('Batman');
    expect(results[1].nativeElement.textContent.trim()).toBe('Superman');
    expect(results[2].nativeElement.textContent.trim()).toBe('Iron Man');
    expect(results[3].nativeElement.textContent.trim()).toBe('Wonder Woman');
  }));

});
