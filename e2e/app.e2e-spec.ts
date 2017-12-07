import { ValueSetPortalPage } from './app.po';

describe('value-set-portal App', () => {
  let page: ValueSetPortalPage;

  beforeEach(() => {
    page = new ValueSetPortalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
