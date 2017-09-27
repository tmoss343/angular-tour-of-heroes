import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('DashboardComponent', () => {

  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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

  const mockHeroesIncomplete: Hero[] =  [
    {id: 1, name: 'Batman'},
    {id: 2, name: 'Superman'},
  ];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
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
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;

    heroService = fixture.debugElement.injector.get(HeroService);
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  it('should display heroes 2, 3, 4 and 5', fakeAsync(() => {
    spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(mockHeroes));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const deElements = fixture.debugElement.queryAll(By.css('.hero h4'));

    expect(deElements.length).toBe(4);
    expect(deElements[0].nativeElement.textContent).toBe('Superman');
    expect(deElements[1].nativeElement.textContent).toBe('Iron Man');
    expect(deElements[2].nativeElement.textContent).toBe('Kick-ass');
    expect(deElements[3].nativeElement.textContent).toBe('Thor');
  }));

  it('should work when less than 5 entries', fakeAsync(() => {
    spy = spyOn(heroService, 'getHeroes').and.returnValue(Promise.resolve(mockHeroesIncomplete));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const deElements = fixture.debugElement.queryAll(By.css('.hero h4'));

    expect(deElements.length).toBe(1);
    expect(deElements[0].nativeElement.textContent).toBe('Superman');
  }));

});
