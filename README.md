# Contact List App

Deployed at: [https://contact-list--app.herokuapp.com/](https://contact-list--app.herokuapp.com/)

Github repo: [https://github.com/madeofhuman/contact-list-app](https://github.com/madeofhuman/contact-list-app)

This is a contact list application that pulls in data from the https://api.randomuser.me api. Contacts are displayed in a tabbed component. 

To control the API endpoint and number of contacts fetched, there is a `config.json` file that contains the following settings:

```js
{
  "title": "Contact List",
  "userUrl": "https://api.randomuser.me",
  "numberCards": 120,
  "tabs": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
}
```
The `title` key controls the displayed title on the application page, the `userUrl` key denotes the API to fetch the contacts from, the `numberCards` key specifies how many contacts to fetch, while the `tabs` property controls the display of the tab heads.

Clicking the contact names displays a popup with additional details about the contact. You can click again on the name or on the `X` icon on the popup to close the modal. You can also click on other names to display additional data about them.

## Development and Testing

### With Docker

To set up the development environment, ensure you have [Docker](https://docs.docker.com/get-docker/) installed for your operating system, then pull this repo and navigate to the project directory and run the command `docker-compose up app -d` in the terminal. Navgate to `http://localhost:3000` to view the app.
Run the command `docker-compose down` to stop the development server.

Tests are written using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), and can be found in the `src/__tests__` directory. To run tests, run the comand `docker-compose build test` then run `docker-compose run test`.

### Without Docker

If you don't have Docker installed (or you'd rather not use it), ensure you have [Node](https://nodejs.org/en/) installed on your system. Then navigate to the project directory and run the command `npm start` to start the development server. To run tests, run the command `npm test`.

### Using Make commands

To make things easier, you can run the Make commands to start and stop the development server, as well as run tests.

Using docker, run `make docker-start` to start the server, `make docker-stop` to stop it, and `make docker-test` to run tests.

If you're not using docker, run `make start` to start the server, type Ctrl + C in the terminal to stop it, and run `make test` to run tests.
