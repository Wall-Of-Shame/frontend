# Wall Of Shame Frontend

## Setup

1. Clone the repository.
2. In a terminal, navigate to the root directory of the cloned repository.
3. Run `yarn install` to install the dependencies.
4. Run `yarn start` to fire up the local host.

## Project Structure

### `app/` directory

Contains:

- `App.tsx`, the entry point of the application.
- `store.tsx`, for Redux store.

### `assets/` directory

Contains static resources such as images.

### `components/` directory

Contains components that are used by more than 1 other components.

### `constants/` directory

Contains constants that are used throughout the application.

### `contexts/` directory

Contains contexts providing React hooks and providers that can be used by React components.

### `interfaces/` directory

Contains interfaces used in the application. Some of these interfaces are used for communication with our backend server as well.

### `pages/` directory

Contains folders containing components that are wrapped by React Router's `<Route>` in `src/app/App`.

### `reducers/` directory

Contains reducers used in the application. [Redux Toolkit](https://redux-toolkit.js.org/) is used as the redux library of choice.

### `services/` directory

Contains helper services that interface directly with the backend API. They are generally called by contexts.

### `utils/` directory

Contain helper functions and data for usage around the application.

## Rules for Development

### Linting and Styling

1. We will be using VSCode for development of this project. Please ensure that you have the Prettier extension installed and set to the default formatter. You may also configure your VSCode to format your code on save to save some trouble.

2. For linting, we will be following ESLint. There should not be any configuration required as it is packaged in our project.

### Coding Practices

1. For any new page (i.e. a screen that requires its own route), please copy all the code in Page.tsx to your new page, rename the component and modify from there. This is to ensure the general layout of our App is kept consistent (i.e. top bar, bottom tabs etc.).

2. For components with huge number of states, please follow the useReducer pattern instead of the normal useState for better maintainability.

## To Take Note

When developing on Chrome, please comment out all the code inside the <script> tag in index.html. This is meant to be a hacky fix to the iOS swiping gesture issue, however, it interferes with Chrome's touch events in phone mode, causing the page to become not clickable.

```
<script>
  /* Comment out this part
  const element = document.querySelector("div");
  element.addEventListener("touchstart", (e) => {
    if (
      e.pageX > window.innerWidth * 0.05 &&
      e.pageX < window.innerWidth * 0.95
    ) {
      return;
    }
    e.preventDefault();
  });
  */
</script>
```
