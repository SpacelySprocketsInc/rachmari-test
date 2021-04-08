// Suppress logging
jest.mock('bunyan');

jest.mock('actions-toolkit');
const { Toolkit } = require('actions-toolkit');

jest.mock('../lib/notify-issue-author');
const notifyIssueAuthor = require('../lib/notify-issue-author');

const entrypoint = require('../entrypoint');

describe('entrypoint', () => {
  afterEach(() => {
    Toolkit.mockReset();
    notifyIssueAuthor.mockReset();
  });

  it('fails when no GitHub Actions environment is available', async () => {
    Toolkit.mockImplementation(() => {
      return {
        context: {}
      };
    });

    const success = await entrypoint();

    expect(success).toBe(false);
    expect(Toolkit).toHaveBeenCalledTimes(1);
    expect(notifyIssueAuthor).not.toHaveBeenCalled();
  });

  it('succeeds when a GitHub Actions environment is available', async () => {
    const tools = {
      context: {
        event: 'issues'
      }
    };
    Toolkit.mockImplementation(() => {
      return tools;
    });

    const success = await entrypoint();

    expect(success).toBe(true);
    expect(Toolkit).toHaveBeenCalledTimes(1);
    expect(notifyIssueAuthor).toHaveBeenCalledTimes(1);
    expect(notifyIssueAuthor).toHaveBeenNthCalledWith(1, tools);
  });
});
 
