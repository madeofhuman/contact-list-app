import { render, screen, waitFor, cleanup, within, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import ContactPopup from '../components/ContactPopup';
import config from '../config';

const apiResponse = require('./fetchResultMock.json');

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify(apiResponse));
});

afterEach(cleanup);

describe('View:', () => {
  test('should render title', async () => {
    render(<App />);
    const title = await screen.findByText(config.title);
    expect(title).toBeInTheDocument();
  });

  test('renders tabs', async () => {
    render(<App />);

    await waitFor(() => {
      config.tabs.forEach(tab => {
        const tabTitle = screen.getByTestId(tab);
        expect(tabTitle).toBeInTheDocument();
      });
    });
  });

  test('should set the first tab as the active tab', async () => {
    render(<App />);

    await waitFor(() => {
      const firstTab = screen.getByTestId(config.tabs[0]);
      expect(firstTab.className).toContain('active');
    });
  });

  test('should render the number of active contacts in the tab', async () => {
    const count = apiResponse.results.filter(contact => contact.name.last[0].toLowerCase() === 'a').length;

    render(<App />);

    await waitFor(() => {
      const firstTab = screen.getByTestId(config.tabs[0]);
      expect(within(firstTab).getByText(count)).toBeInTheDocument();
    });
  });

  test('should render the contacts list for an active tab', async () => {
    const activeContactsUUID = apiResponse.results
      .filter(contact => contact.name.last[0].toLowerCase() === 'a')
      .map(contact => contact.login.uuid);

    render(<App />);

    await waitFor(() => {
      activeContactsUUID.forEach(uuid => {
        const contact = screen.getByTestId(uuid);
        expect(contact).toBeInTheDocument();
      })
    });
  });

  test('should render the contact popup', () => {
    const contact = apiResponse.results[0];
    const props = {
      layoutData: {
        width: 300,
        top: 50,
        left: 50
      },
      closePopup: () => {},
      contact: contact,
    }
    render(<ContactPopup {...props} />);

    const matcher = `${contact.name.last.toUpperCase()}, ${contact.name.first.toLowerCase()}`;
    expect(screen.getByText(matcher)).toBeInTheDocument;
    expect(screen.getByText(contact.login.username)).toBeInTheDocument;
  })
})

describe('Actions:', () => {
  test('should set the new tab as the active tab when a new tab is clicked', async () => {
    render(<App />);

    await waitFor(() => {
      const aTab = screen.getByTestId('a');
      expect(aTab.className).toContain('active');
      const bTab = screen.getByTestId('b');
      fireEvent.click(bTab);
      expect(aTab.className).not.toContain('active');
      expect(bTab.className).toContain('active');
    })
  })

  test('should render the contact list for the new tab when a new tab is clicked', async () => {
    const activeContactsUUID = apiResponse.results
      .filter(contact => contact.name.last[0].toLowerCase() === 'b')
      .map(contact => contact.login.uuid);

    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('b'));
      activeContactsUUID.forEach(uuid => {
        const contact = screen.getByTestId(uuid);
        expect(contact).toBeInTheDocument();
      })
    })
  });

  test('should render the contact details popup when a contact name is clicked', async () => {
    const activeContact = apiResponse.results
      .filter(contact => contact.name.last[0].toLowerCase() === 'a')[0];

    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId(activeContact.login.uuid));
      const matcher = `${activeContact.name.last.toUpperCase()}, ${activeContact.name.first.toLowerCase()}`;
      expect(screen.getByText(matcher)).toBeInTheDocument;
      expect(screen.getByText(activeContact.login.username)).toBeInTheDocument;
    })
  });

  test('should close the contact details popup modal when the close icon is clicked', async () => {
    const activeContact = apiResponse.results
      .filter(contact => contact.name.last[0].toLowerCase() === 'a')[0];

    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId(activeContact.login.uuid));
      expect(screen.getByText(activeContact.login.username)).toBeInTheDocument;

      fireEvent.click(screen.getByTestId('popup-close'));
      expect(screen.queryByText(activeContact.login.username)).not.toBeInTheDocument;
    })
  });
})



