# week 7: Day 5 - weather dashboard code review

## 1. Error handling audit
* **Observation:** Initial fetch requests lacked handling for incorrect city input r network disconnects.
* **Improvement:** Added `try...catch` blocks and validated `response.ok` status codes so the UI displays an explicit error message to the user instead of breaking execution.

## 2. Modular architecture
* **Observation** API logic and DOM manipulation functions were tightly coupled in a single script.
* **Improvement** Separated network requests into dedicated service modules and kept UI updated isolated,improving maintainability and testability.

## 3. Security check
* **Observation** API credentials required secure isolation.
* **Improvement** configured environment parameters and git-ignored config files to keep sensitivity keys safe from public repository history.