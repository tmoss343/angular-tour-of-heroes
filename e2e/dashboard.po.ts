import { browser, by, element } from 'protractor';

export class DashboardPage {

  private searchInput = element(by.css('#search-box'));
  private searchResults = element.all(by.css('.search-result'));

  navigateTo() {
    return browser.get('/dashboard');
  }

  searchFor(term: string) {
    this.searchInput.sendKeys(term);
  }

  getSearchResults() {

    const results =  this.searchResults.map((elm, index) => {
      return {
        index: index,
        text: elm.getText()
      };
    });

    return results;

  }

  clickSearchResult(index: number) {
    this.searchResults.get(index).click();
  }

}
