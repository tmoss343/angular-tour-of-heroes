import { ComponentFixture, async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('HeroesComponent', () => {

  let comp: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;
  let spy: any;

  const mockHeroes: Hero[] =  [
    {id: 1, name: 'Batman'},
    {id: 2, name: 'Superman'},
    {id: 3, name: 'Iron Man'},
    {id: 4, name: 'Kick-ass'},
    {id: 5, name: 'Thor'},
    {id: 7, name: 'Wonder Woman'},
    {id: 8, name: 'Robin'}
  ];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        HeroService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpModule
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    comp = fixture.componentInstance;

    heroService = fixture.debugElement.injector.get(HeroService);
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  it('should list heroes', fakeAsync(() => {
    spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(mockHeroes));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const liElements = fixture.debugElement.queryAll(By.css('ul.heroes li'));
    const badgeElements = fixture.debugElement.queryAll(By.css('ul.heroes li span.badge'));
    const buttonElements = fixture.debugElement.queryAll(By.css('ul.heroes li button.delete'));

    expect(liElements.length).toBe(7);
    expect(badgeElements.length).toBe(7);
    expect(buttonElements.length).toBe(7);
    expect(liElements[0].nativeElement.textContent.trim()).toContain('Batman');
    expect(liElements[6].nativeElement.textContent.trim()).toContain('Robin');

  }));

  /* Add, delete and update functionality will be tested as E2E tests. */

});
