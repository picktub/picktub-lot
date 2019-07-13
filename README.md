# NPM package 생성, 배포 설정

## 설정 과정
1.
```bash
mkdir <project-name>
cd <project-name>
```

2. npm init
```bash
npm init
```

3. Install dependency packages.
```bash
npm i -D @babel/core babel-loader webpack webpack-cli clean-webpack-plugin
```

4. Make .ignore files
- `.npmignore` file
```text
node_modules/
.git/

.DS_Store
```

- `.gitignore` file
```text
node_modules

# webpack bundling files
dist
```

5. Wirte your library codes.
```bash
mkdir src
cd src
```

6. Write `webpack.config.js`
```js
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const libraryName = 'main';
const outputFileName = `${libraryName}`;

module.exports = {
  entry: './index.js',
  output: {
    filename: `${outputFileName}.js`,
    path: path.resolve(__dirname, 'dist'),
    library: libraryName,
    libraryTarget: 'umd',
    globalObject: '(typeof self !== \'undefined\' ? self : this)',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  mode: 'production',
};
```

7. `Test` setup
```bash
npm i -D @babel/node @babel/preset-env jasmine-spec-reporter karma karma-chrome-launcher karma-cli karma-jasmine karma-spec-reporter karma-webpack
```
- in `./test` folder, set nodejs testing environment.
- ./test/jasmine.json
```json
{
  "spec_dir": "src",
  "spec_files": [
    "**/*[sS]pec.js"
  ],
  "helpers": [
    "../test/helpers/**/*.js"
  ],
  "stopSpecOnExpectationFailure": false,
  "random": true
}
```
- ./test/nodejsTestRun.js
```js
import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('./test/jasmine.json');
jasmine.execute();
```

- ./test/helpers/reporter.js
```js
/* eslint-disable */
const { SpecReporter } = require('jasmine-spec-reporter');

jasmine.getEnv().clearReporters(); // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter({ // add jasmine-spec-reporter
  spec: {
    displayPending: true,
  },
}));
```

- Set browser testing environment
- Make `./test/karma.conf.js` file
```js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['../src/**/*.spec.js'],
    reporters: ['spec'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    preprocessors: {
      '../src/**/*.spec.js': ['webpack']
    },
    webpack: {
      module: {
          rules: [
              { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
          ]
      },
    },
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity
  })
}
```



8. Edit package.json
```json
{
  "name": "package-name-your",
  "version": "0.0.3",
  "description": "npm NPM test package.",
  "main": "./dist/main.js",
  "scripts": {
    "prepublishOnly": "npm run build",
    "build": "webpack --mode production",
    "test": "npm run nodejsTest && npm run browserTest",
    "nodejsTest": "babel-node ./test/nodejsTestRun.js --config-file ./babel.config.js",
    "browserTest": "karma start --single-run --browsers ChromeHeadless ./test/karma.conf.js"
  },
  "author": "<author>",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.5.0",
    "@babel/node": "^7.5.0",
    "@babel/preset-env": "^7.5.0",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "eslint": "^6.0.1",
    "eslint-config-airbnb-base": "^13.2.0",
    "eslint-plugin-import": "^2.18.0",
    "jasmine": "^3.4.0",
    "jasmine-spec-reporter": "^4.2.1",
    "karma": "^4.1.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-cli": "^2.0.0",
    "karma-jasmine": "^2.0.1",
    "karma-spec-reporter": "0.0.32",
    "karma-webpack": "^4.0.2",
    "webpack": "^4.35.2",
    "webpack-cli": "^3.3.5"
  }
}
```

9. ESLint
```bash
npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import 
```

- `.eslintignore`
```text
/dist/
```

- `.eslintrc.js`
```js
const path = require('path');

module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    }
  },
  "overrides": [
    {
      "files": [ "src/**/*.spec.js" ],
      "env": { 
        "jasmine": true
      },
      "globals": { 
        "expect": true,
      },
    }
  ],
  "extends": [
    "airbnb-base"
  ],
  "plugins": [        
      'import'
  ],
};
```

10. publish
- Build webpack
```bash
npm run build
```

- publish
```bash
npm login
# then
npm publish --access public

# if you unpublish package in 72 hours.
npm unpublish <package-name> -f
```