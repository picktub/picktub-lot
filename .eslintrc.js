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