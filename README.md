# Week 7: JS Best Practices - To-Do List

## Author
- **Name:** Rahab Kungu
- **GitHub:** [@rahabkungu](https://github.com/rahabkungu)
- **Date:** November 13, 2026

## Project Description
A professional version of my Week 5 To-Do List. The code is split into ES modules, tasks and the selected filter survive a page refresh using localStorage, and the pure logic is covered by unit tests and checked with ESLint.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES modules)
- Node.js test runner (`node --test`)
- ESLint 9 and Prettier
- Git and GitHub Pages

## Features
- Add, complete, edit and delete tasks
- Filter by All, Active and Completed
- Clear completed tasks
- Tasks and filter saved in localStorage
- Does not crash if the saved data is missing or broken
- Pure functions in `todo-logic.js` (no `document`, no `localStorage`)
- Lesson 13 Shopping Cart in `cart/` and five daily challenges in `daily-challenges/`

## How to Run
1. Clone this repository
2. Run `npm install`
3. Run `npm test` and `npm run lint`
4. Open `index.html` with VS Code Live Server (opening the file directly gives a CORS error with modules)

Requires Node 22 or 24.

## Lessons Learned
- How to split a program into modules (state, storage, logic, UI) and why pure functions are easy to test
- How to write unit tests with the Node test runner, including an edge case and a non-mutation test
- How to set up ESLint 9 with `eslint.config.js` and use `.gitignore` before `npm install`

## Challenges Faced
- The filter buttons crashed with `Cannot read properties of undefined` because `filterTodos` had no final `return`. I added `return todos;`.
- The filter buttons did not work because of invalid HTML (`data-filter` written as a tag instead of an attribute). I moved it onto the button.
- `git push` failed on a slow connection and then because the repo name had a trailing dash. I fixed the remote URL.

## Collaboration
- **PR I opened:** https://github.com/rahabkungu/iyf-s12-week-07-rahabkungu/pull/1

## Live Demo
[View Live Demo](https://rahabkungu.github.io/iyf-s12-week-07-rahabkungu/)
