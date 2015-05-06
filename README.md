### AFNum
[![Build Status](https://travis-ci.org/dicksont/afnum.svg?branch=master)](https://travis-ci.org/dicksont/afnum)


# Introduction
AFNum provides several types that can be used for spreadsheet coordinate calculation. They are:

**[Row](./docs/ROW.md)** - *A row represents a row of cells in a spreadsheet. Its value can range from 1 to Number.MAX_SAFE_INTEGER*

**[Column](./docs/COLUMN.md)** - *A column represents a column of cells in a spreadsheet. Its value ranges from 'A' to 'Z', 'AA' to 'AZ', and so on.*

**[Cell](./docs/CELL.md)** - *A cell represents a cell in a spreadsheet. It consists of row and a column.*

**[Range](./docs/RANGE.md)** - *A range represents a block of cells in a spreadsheet. It consists of a start and an end.*


# Installation
AFNum is available as an [npm package](https://www.npmjs.com/package/afnum). Simpy, install with

```Shell
npm install afnum
```

# Testing
An extensive suite of tests is can be viewed at [spec/afnum_spec.js](spec/afnum_spec.js). You can run the tests in node with:

```Shell
npm test
```

or in the browser, by GET'ing [spec/runner.html](spec/runner.html).
