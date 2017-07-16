import { browser, by, element } from 'protractor';

export class Malcoceba.CatPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
