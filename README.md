# Angular Builder with Custom Webpack

This bulder extends [@angular-devkit/build-angular](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular).

This bulder can customize webpack configuration built by official builder.

To use it on your Angular CLI app, follow these steps:

- run `npm install -D ngx-custom-webpack-builder`.
- create a webpack configuration.
- add the following targets inside `angular.json`.

```json
  "projects": {
    "app": {
      // ...
      "architect": {
        // ...
        "build": {
          "builder": "ngx-custom-webpack-builder:browser",
          "options": {
            // ...
            "webpackConfig": "webpack-customize.config.js"
          }
        },
        "serve": {
          "builder": "ngx-custom-webpack-builder:dev-server",
          "options": {
            // ...
            "webpackConfig": "webpack-customize.config.js"
          }
        },
```
