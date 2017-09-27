import { browser, by, element } from 'protractor';

export class HerosPage {

  private heroes = element.all(by.css('.heroes li'));
  private delBttns = element.all(by.css('.delete'));

  private heroInput = element(by.css('#hero-input'));
  private heroInputSubmit = element(by.css('.add-hero'));

  navigateTo() {
    return browser.get('/heroes');
  }

  noHeroes() {
    return this.heroes.count();
  }

  addHero(name: string) {
    this.heroInput.sendKeys(name);
    this.heroInputSubmit.click();
  }

  delHero(index: number) {
    this.delBttns.get(index).click();
  }

}
