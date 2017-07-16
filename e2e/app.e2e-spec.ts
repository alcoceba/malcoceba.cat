import { Malcoceba.CatPage } from './app.po';

describe('malcoceba.cat App', () => {
  let page: Malcoceba.CatPage;

  beforeEach(() => {
    page = new Malcoceba.CatPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
