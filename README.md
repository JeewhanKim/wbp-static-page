# Coding Challenge: Create Lightbox using provided JSON data
This package creates new web contents from a JSON file. Budnle your app using `Gulp`, `Browserify`, and `gulp-scss`.
Simply open /dist/index.html to see the generated version.

## Getting Started

### Dependencies
- This code is written in ES6 including `gulpfile.js`. Node ver 4+ is required.
- Install npm dependencies
```sh
# NPM
npm install 
```
This downloads all dependencies listed in package.json including Gulp.

### Quick Start
You can simply just open the `dist/index.html` file to see the bundled app.

Run gulp and it will bundle your resources and open your browser with the url: http://localhost:8080/dist/index.html
```sh
gulp
```

## Folder Structure
- `/src/index.html` --- static index html
- `/src/js/` --- main app Javascript controllers
- `/src/style/` --- main SCSS file folder
- `/dist/` --- generated folder for dev server & production

## Developer Note

#### Javascript
Please note that I have implemented this with mostly vanilla Javascript/ES6 syntax.

#### HTML & Static Files
Simple, symantic HTML structure was considered.

#### SCSS
I have implemeneted simple mixin to generate media queries in a simple way which is in `/src/style/mixin/_mixin.scss`.
I did not include external web font files and tried not to use too many style files & lines for the code's simplicity.