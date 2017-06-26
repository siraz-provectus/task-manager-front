import { TaskmanagerFrontPage } from './app.po';

describe('taskmanager-front App', () => {
  let page: TaskmanagerFrontPage;

  beforeEach(() => {
    page = new TaskmanagerFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
