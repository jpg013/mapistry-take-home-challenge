# Mapistry Take Home Challenge

This is the Mapistry take home challenge. You will use this code base starter to finish building a client/server tic-tac-toe game. Further instructions can be found in the [Fullstack Challenge README](README_FULLSTACK.md).

## Project structure

This project is built as a monorepo using [yarn workspaces](https://yarnpkg.com/features/workspaces). It contains 3 packages:

1. `client` - The client and UI portion of the tic-tac-toe game
1. `server` - The server and AI portion of the tic-tac-toe game
1. `shared` - TypeScript types and constants that are shared between the client and server

## Development environment

We have built this project with the idea of minimizing setup time for candidates attempting to complete the challenge. In this process we have made a number of decisions regarding tooling that we think provide a robust, but easy to use development experience while giving you an idea of the type of development environment we use on a daily basis. Please feel free to modify the environment and tooling however you see fit.

### Getting started

#### Monorepo root

```sh
$> yarn install
```

#### Client

```sh
$> yarn workspace @mapistry/take-home-challenge-client start
```

> The UI should be accessible at `http://localhost:3000`

#### Server

```sh
$> yarn workspace @mapistry/take-home-challenge-server start
```

#### Linting

From the monorepo root

```sh
$> yarn lint
```

#### Typechecking

Should you chose to use typescript (again, that's optional, vanilla js is fine!). From the monorepo root

```sh
$> yarn typecheck
```

#### Testing

From the monorepo root

```sh
$> yarn test
```

## Tooling used

### Node

This project was built using the [current LTS version of Node](https://nodejs.org/en/about/releases/) (lts/gallium)

### TypeScript

This project was built with [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) because it is our language of choice. That being said, we encourage you to complete this project using your preference of JavaScript or TypeScript. We will not give any preferential treatment for choosing either language to complete the project.

### Package management

We've chosen [yarn v3](https://yarnpkg.com/getting-started/usage) as the package manager for this code base. Since we're using node v16.13+ you may use [Corepack](https://yarnpkg.com/getting-started/install) to install yarn if you don't already have it installed.

#### Yarn Primer

It works similar to npm and many of the commands are similar

- `yarn install` to install dependencies

### Bundling

We have chosen [webpack](https://webpack.js.org/concepts/) to assist with transpiling and bundling both the client and server packages. This should allow you to see code changes in either package upon saving.

### Code standards

#### Linting

We're using [ESLint](https://eslint.org/docs/user-guide/getting-started) and the [Airbnb's linting rules](https://www.npmjs.com/package/eslint-config-airbnb) with a few minor customizations.

#### Formatting

We have chosen [Prettier](https://prettier.io/docs/en/index.html) as a code formatter.

### Testing

[Jest](https://jestjs.io/docs/getting-started) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) were chosen as the testing libraries for this project. You're free to add tests if they help you out in development.
