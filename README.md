# with-drivers

[![Build Status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![NPM version][npm-image]][npm-url]
[![Dependencies Status][dependencies-image]][dependencies-url]
[![DevDependencies Status][devdependencies-image]][devdependencies-url]

Middleware that instantiates and adds drivers to the context inside `driver` property. It accepts an optional config property with keys matching driver names.

```js
const handler = require('@alpha-lambda/handler');
const { S3, SQS } = require('@alpha-lambda/aws-drivers');
const withDrivers = require('@alpha-lambda/with-drivers');

const config = {
  sqs: { level: 'debug' }
};

module.exports.handler = handler()
  .use(withDrivers({
    s3: S3,
    sqs: SQS
  }, config))
  .use((event, context) => {
    const { sqs } = context.drivers;
    return sqs.send(/* ... */);
  });
```

## License

The MIT License (MIT)

Copyright (c) 2019 Anton Bazhal

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[ci-image]: https://circleci.com/gh/alpha-lambda/with-drivers.svg?style=shield&circle-token=f9cd9b7744b67ddf69b9769ce19f40c9f5849e5a
[ci-url]: https://circleci.com/gh/alpha-lambda/with-drivers
[coverage-image]: https://coveralls.io/repos/github/alpha-lambda/with-drivers/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/alpha-lambda/with-drivers?branch=master
[dependencies-url]: https://david-dm.org/alpha-lambda/with-drivers
[dependencies-image]: https://david-dm.org/alpha-lambda/with-drivers/status.svg
[devdependencies-url]: https://david-dm.org/alpha-lambda/with-drivers?type=dev
[devdependencies-image]: https://david-dm.org/alpha-lambda/with-drivers/dev-status.svg
[npm-url]: https://www.npmjs.org/package/@alpha-lambda/with-drivers
[npm-image]: https://img.shields.io/npm/v/@alpha-lambda/with-drivers.svg
