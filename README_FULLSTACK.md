# Mapistry Fullstack Take Home Challenge

## The challenge

This project is a partially completed client/server tic-tac-toe game. Your mission will be to complete the code and produce a working game.

## The rules

- Create an unbeatable tic-tac-toe game where the human player always goes first.
- This is an open book/notes challenge. Feel free to search and lookup anything that you think will help you to complete the challenge. Treat this as if it was a ticket you were given rather than a test.
- We anticipate you spending approximately 3 - 4 hours to complete the challenge. If you haven't completed the challenge in that amount of time please commit what you have and explain in the commit message where you left off and what steps remain. Pretend you are leaving on vacation and you need to pass off your work to a teammate.
- We will discuss your solution in a follow up call. Be prepared to talk through the choices and tradeoffs you have made. If you don't finish implementing the AI, leave notes (or maybe pseudo code) on how you would have gone about it and we can discuss.
- While we are providing a testing framework you are not required to use it. If tests help you in your development process feel free to use any framework you'd like.
- The skeleton provided has 2 endpoints:
  - Begin a new game
  - Accept a board and return a board and win status with the computer having taken an additional turn if necessary

## Delivery

Please create a repository in Github with the initial commit including only the code we have provided. Then create a branch and open a pull request against the `main` branch of this repository with your work. Treat it like any pull request you would open at work.

## Additional info

#### server

A skeleton of the router has been provided as a kick-off point:

- [router.ts](./packages/server/src/router.ts)

#### client

Some skeleton components have been provided as a kick-off point:

- [App.tsx](./packages/client/src/components/App.tsx)
- [api.ts](./packages/client/src/api.ts) - This provides async interaction with the API
- [styles](./packages/client/src/styles) - Just the reset styles for various browsers

Note that all API endpoints are prefixed with `/api`, e.g. `/api/begin` instead of just `/begin`. But you can just use the provided API helpers in [api.ts](./packages/client/src/api.ts) to hit the API.

> Reminder: You may use either JavaScript or TypeScript to complete the solution. Please use whatever language you are most comfortable with. We will not give preference to either language choice.
