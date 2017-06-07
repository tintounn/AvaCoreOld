import { AvaPage } from './app.po';

describe('ava App', () => {
  let page: AvaPage;

  beforeEach(() => {
    page = new AvaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
