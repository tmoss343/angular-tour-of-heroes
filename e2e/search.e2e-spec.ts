import { HeroDetailPage } from './hero-detail.po';
import { DashboardPage } from './dashboard.po';
import { browser, protractor, element, by } from 'protractor';

describe('Hero search', () => {

  let dPage: DashboardPage;
  let hdPage: HeroDetailPage;

  beforeEach(() => {
    dPage = new DashboardPage();
    hdPage = new HeroDetailPage();
  });

  it('should display matching search results', () => {
    dPage.navigateTo();
    dPage.searchFor('man');
    browser.sleep(1000);

    expect(dPage.getSearchResults()).toEqual([
      {index: 0, text: 'Batman'},
      {index: 1, text: 'Superman'},
      {index: 2, text: 'Iron Man'},
      {index: 3, text: 'Wonder Woman'},
    ]);
  });

  it('should navigate from search result to hero details', () => {
    dPage.navigateTo();
    dPage.searchFor('man');
    browser.sleep(1000);

    dPage.clickSearchResult(0);

    expect(hdPage.getHeaderText()).toBe('Batman details!');
  });

});
