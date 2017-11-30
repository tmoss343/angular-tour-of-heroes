# Angular Tour Of Heroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Tests

I wrote several tests for this tutorial app.

### Component and Service Tests

The component and service tests will be executed in a browser. Each test checks a component or service for itself. The data for the tests is mocked.

- Component test files has the ending `*.component.spec.ts`
- Service test files has the ending `*.service.spec.ts`
- The configuration can be found in the `karma.conf.js` file

These tests will be executed with `ng test`

### E2E Tests

To test several components in one test you can run E2E tests. These tests are working with Selenium / WebDriver and the syntax and patterns are very similar.

- E2E test files are located in the `e2e` directory
- The configuration can be found in the `protractor.conf.js` file

These tests will be executed with `ng e2e`.
