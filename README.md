# Dynform2


## Abstarct

This is a simple yet distinguished Angular 17 (17.2) project of mine, for a dynamic form implementation using dynamic components.

The form fields/controls metadata are provided as an array of metadata objects. This array is provided dynamically via the instantiation of a respective domain service. The domain service is instantiated via a factory service provider class. The form fields array can be kept updated dynamically with initial values obtained as a row set from the backend.

The dynamic form is a reactive one using intependent standalone components that are dynamically loaded at runtime via a helper directive. The dynamic form is also built as a a typed form, and the type of each control is obtained from the type of the value of a property of a metadata object.

Furthermore, the form, as well as the candidate dynamic components are based on the Material library, but this can be easily changed, by changing even, just the respective templates.

Read more at my post [here](https://medium.com/@zzpzaf.se/a-standalone-dynamic-form-an-angular-17-implementation-f708dc02ad8d).


---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

(C)opyright P. Zafeiropoulos 2024

License: MIT