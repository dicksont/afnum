(function(factory) {

  if (typeof module !== 'undefined' && module && module.exports) { // Node.js & CommonJS
    var qunit = QUnit || require('qunitjs');
    var afnum = require('../lib/afnum.js');
    module.exports = factory(qunit, afnum);
  } else if (typeof define === 'function' && define.amd) { // Require.js & AMD

    define([ 'qunit', 'afnum'], function(qunit, afnum) {
      factory(qunit, afnum);
    });
  } else { // Browser
    factory(QUnit, AFNum);
  }
})(function(QUnit, AFNum) {

  Number.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991; // Number.MAX_SAFE_INTEGER not defined for some Node.js versions

  QUnit.module('Row');

  QUnit.test( "Row", function( assert ) {
    assert.ok(AFNum.Row() == null, "Row() == null" );
    assert.ok(AFNum.Row(0) == null, "Row(0) == null" );
    assert.ok(AFNum.Row(-1) == null, "Row(-1) == null" );
    assert.ok(AFNum.Row('A') == null, "Row('A') == null" );
    assert.ok(AFNum.Row(Number.MAX_SAFE_INTEGER + 1) == null, "Row(MAX_SAFE_INTEGER + 1) == null");

    assert.ok(AFNum.Row(1) instanceof AFNum.Row, "Row(1) instanceof Row" );
    assert.ok(AFNum.Row('1') instanceof AFNum.Row, "Row('1') instanceof Row" );
    assert.ok(AFNum.Row(Number.MAX_SAFE_INTEGER) instanceof AFNum.Row, "Row(MAX_SAFE_INTEGER) instanceof Row");
  });


  QUnit.test( "Row.number", function( assert ) {
    assert.ok(AFNum.Row(1).number == 1, "Row(1).number == 1");
    assert.ok(AFNum.Row('1').number == 1, "Row('1').number == 1");
    assert.ok(AFNum.Row(2).number == 2, "Row(2).number == 2");
    assert.ok(AFNum.Row(Number.MAX_SAFE_INTEGER).number == Number.MAX_SAFE_INTEGER, "Row(MAX_SAFE_INTEGER).number == MAX_SAFE_INTEGER")
  });


  QUnit.test( "Row.string", function( assert ) {
    assert.ok(AFNum.Row(1).number == '1', "Row(1).number == '1'");
    assert.ok(AFNum.Row('1').number == '1', "Row('1').number == '1'");
    assert.ok(AFNum.Row(2).number == '2', "Row(2).number == '2'");
    assert.ok(AFNum.Row(Number.MAX_SAFE_INTEGER).number == (Number.MAX_SAFE_INTEGER + ''), "Row(MAX_SAFE_INTEGER).number == MAX_SAFE_INTEGER")
  });

  QUnit.test( "Row.increment", function( assert ) {
    assert.ok(AFNum.Row(1).increment(0).number == 1, "Row(1).increment(0).number == 1");
    assert.ok(AFNum.Row(1).increment(1).number == 2, "Row(1).increment(1).number == 2");
    assert.ok(AFNum.Row(2).increment(-1).number == 1, "Row(2).increment(-1) == 1");
    assert.ok(AFNum.Row(1).increment(-1) == null, "Row('1').increment(-1) == null");
  });


  QUnit.test( "Row.compare", function( assert ) {
    assert.ok(AFNum.Row(5).compare(AFNum.Row(2)) > 0, "Row(5).compare(Row(2)) > 0");
    assert.ok(AFNum.Row(5).compare(AFNum.Row(5)) == 0, "Row(5).compare(Row(5)) == 0");
    assert.ok(AFNum.Row(5).compare(AFNum.Row(7)) < 0, "Row(5).compare(Row(7)) < 0");
    assert.ok(AFNum.Row(5).compare(AFNum.Row(0)) == undefined, "Row(5).compare(Row(0)) == undefined");

    assert.ok(AFNum.Row(Number.MAX_SAFE_INTEGER).compare(AFNum.Row(5)) > 0, "Row(MAX_SAFE_INTEGER).compare(Row(5)) > 0");
    assert.ok(AFNum.Row(5).compare(AFNum.Row(Number.MAX_SAFE_INTEGER)) < 0, "Row(5).compare(Row(MAX_SAFE_INTEGER)) < 0");
    assert.ok(AFNum.Row(Number.MAX_SAFE_INTEGER).compare(AFNum.Row(Number.MAX_SAFE_INTEGER)) == 0, "Row(MAX_SAFE_INTEGER).compare(Row(MAX_SAFE_INTEGER)) == 0");
  });

  QUnit.test( "Row.hasCell", function( assert ) {
    assert.ok(AFNum.Row(1).hasCell(AFNum.Cell('A1')), "Row(1).hasCell(AFNum.Cell('A1'))");
    assert.ok(AFNum.Row(1).hasCell('A1'), "Row(1).hasCell('A1')");
    assert.ok(!AFNum.Row(2).hasCell('A1'), "!Row(2).hasCell('A1')");
  });

  QUnit.test( "Row.cellsInRange", function( assert ) {
    assert.ok(AFNum.Row(1).cellsInRange('A2:B3').strarray().length == 0, "Row(4).cellsInRange('A2:B3').length == 0");

    var cellstrar = AFNum.Row(2).cellsInRange('A2:B3').strarray();

    assert.ok(cellstrar.length == 2, "Row(2).cellsInRange('A2:B3').length == 2");
    assert.ok(~cellstrar.indexOf('A2') && ~cellstrar.indexOf('B2'), "Row(2).cellsInRange('A2:B3') ~= ['A2', 'B2']");

    cellstrar = AFNum.Row(3).cellsInRange('A2:B3').strarray();

    assert.ok(cellstrar.length == 2, "Row(3).cellsInRange('A2:B3').length == 2");
    assert.ok(~cellstrar.indexOf('A3') && ~cellstrar.indexOf('B3'), "Row(3).cellsInRange('A2:B3') ~= ['A3', 'B3']");


    assert.ok(AFNum.Row(4).cellsInRange('A2:B3').strarray().length == 0, "Row(4).cellsInRange('A2:B3').length == 0");
  });


  QUnit.module('Column');

  QUnit.test( "Column", function( assert ) {
    assert.ok(AFNum.Column() == null, 'Column() == null');

    assert.ok(AFNum.Column('') == null, "Column('') == null");

    assert.ok(AFNum.Column('A') instanceof AFNum.Column , "Column('A') instanceof Column");
    assert.ok(AFNum.Column('a') instanceof AFNum.Column , "Column('a') instanceof Column");
    assert.ok(AFNum.Column('AA') instanceof AFNum.Column , "Column('A') instanceof Column");
    assert.ok(AFNum.Column(1) instanceof AFNum.Column, "Column(1) instanceof Column");
    assert.ok(AFNum.Column('1') instanceof AFNum.Column, "Column('1') instanceof Column");

    assert.throws(function() { new AFNum.Column('A') }, "new Column('A') throws error");
  });


  QUnit.test("Column.number", function(assert) {
    assert.ok(AFNum.Column('A').number == 1, "Column('A').number == 1");
    assert.ok(AFNum.Column('a').number == 1, "Column('a').number == 1");
    assert.ok(AFNum.Column('Z').number == 26, "Column('Z').number == 26");
    assert.ok(AFNum.Column('AA').number == 27, "Column('AA').number == 27");
    assert.ok(AFNum.Column(1).number == 1, "Column(1).number == 1");
    assert.ok(AFNum.Column('1').number == 1, "Column('1').number == 1");
    assert.ok(AFNum.Column(27).number == 27, "Column(27).number == 27");
    assert.ok(AFNum.Column('27').number == 27, "Column('27').number == 27");
  });

  QUnit.test("Column.string", function(assert) {
    assert.ok(AFNum.Column('A').string == 'A', "Column('A').string == 'A'");
    assert.ok(AFNum.Column('a').string == 'A', "Column('a').string == 'A'");
    assert.ok(AFNum.Column('Z').string == 'Z', "Column('Z').string == 'Z'");
    assert.ok(AFNum.Column('AA').string == 'AA', "Column('AA').string == 'AA'");
    assert.ok(AFNum.Column(1).string == 'A', "Column(1).string == 'A'");
    assert.ok(AFNum.Column('1').string == 'A', "Column('1').string == 'A'");
    assert.ok(AFNum.Column(27).string == 'AA', "Column(27).string == 'AA'");
    assert.ok(AFNum.Column('27').string == 'AA', "Column('27').string == 'AA'");
  });

  QUnit.test("Column.increment", function(assert) {
    assert.ok(AFNum.Column('A').increment(0).string == 'A', "Column('A').increment(0) == 'A'");
    assert.ok(AFNum.Column('A').increment(1).string == 'B', "Column('B').increment() == 'A'");
    assert.ok(AFNum.Column('A').increment(-1) == null, "Column('A').increment(-1) == null");
    assert.ok(AFNum.Column('B').increment(-1).string == 'A', "Column('A').increment(-1) == 'A'");
  });

  QUnit.test("Column.compare", function(assert) {
    assert.ok(AFNum.Column('A').compare(AFNum.Column('A')) == 0, "Column('A').compare(Column('A')) == 0");
    assert.ok(AFNum.Column('B').compare(AFNum.Column('A')) > 0, "Column('B').compare(Column('A') > 0");
    assert.ok(AFNum.Column('A').compare(AFNum.Column('B')) < 0, "Column('A').compare(Column('B') < 0");
    assert.ok(AFNum.Column('AA').compare(AFNum.Column('A')) > 0, "Column('AA').compare(Column('A') > 0");
    assert.ok(AFNum.Column('AB').compare(AFNum.Column('AA')) > 0, "Column('AB').compare(Column('AA') > 0");
  });


  QUnit.test( "Column.hasCell", function( assert ) {
    assert.ok(AFNum.Column('A').hasCell(AFNum.Cell('A1')), "Column('A').hasCell(AFNum.Cell('A1'))");
    assert.ok(AFNum.Column('A').hasCell('A1'), "Column('A').hasCell('A1')");
    assert.ok(!AFNum.Column('B').hasCell('A1'), "!Column('B').hasCell('A1')");
  });


  QUnit.test( "Column.cellsInRange", function( assert ) {
    var cellstrar = AFNum.Column('A').cellsInRange('A2:B3').strarray();

    assert.ok(cellstrar.length == 2, "Column('A').cellsInRange('A2:B3').length == 2");
    assert.ok(~cellstrar.indexOf('A2') && ~cellstrar.indexOf('A3'), "Column('A').cellsInRange('A2:B3') ~= ['A2', 'A3']");

    cellstrar = AFNum.Column('B').cellsInRange('A2:B3').strarray();

    assert.ok(cellstrar.length == 2, "Column('B').cellsInRange('A2:B3').length == 2");
    assert.ok(~cellstrar.indexOf('B2') && ~cellstrar.indexOf('B3'), "Column('B').cellsInRange('A2:B3') ~= ['B2', 'B3']");

    cellstrar = AFNum.Column('C').cellsInRange('A2:B3').strarray();

    assert.ok(cellstrar.length == 0, "Column('B').cellsInRange('A2:B3').length == 0");
  });

  QUnit.module('Cell');

  QUnit.test( "Cell", function( assert ) {
    assert.ok(AFNum.Cell() == null, 'Cell() == null');
    assert.ok(AFNum.Cell("A") == null, 'Cell("A") == null');
    assert.ok(AFNum.Cell(1) == null, 'Cell(1) == null');
    assert.ok(AFNum.Cell("1A") == null, "Cell('1A') == null");
    assert.ok(AFNum.Cell("A1") instanceof AFNum.Cell, "Cell('A1') instanceof Cell");
  });

  QUnit.test("Cell.string", function(assert) {
    assert.ok(AFNum.Cell('A7').string == 'A7', "Cell('A7').string == 'A7'");
    assert.ok(AFNum.Cell('a7').string == 'A7', "Cell('a7').string == 'A7'");
    assert.ok(AFNum.Cell('AK47').string == 'AK47', "Cell('AK47').string == 'AK47'");
  });

  QUnit.test( "Cell.row", function( assert ) {
    assert.ok(AFNum.Cell("A1").row instanceof AFNum.Row, " Cell('A1').row instanceof Row");
    assert.ok(AFNum.Cell("AK47").row instanceof AFNum.Row, "Cell('AK47').row instanceof Row");
    assert.ok(AFNum.Cell("A1").row.number == 1, "Cell('A1').row.number == 1");
    assert.ok(AFNum.Cell("AK47").row.number == 47, "Cell('AK47').row.number == 47");

  });

  QUnit.test( "Cell.column", function( assert ) {
    assert.ok(AFNum.Cell("A1").column instanceof AFNum.Column, " Cell('A1').column instanceof Column");
    assert.ok(AFNum.Cell("AK47").column instanceof AFNum.Column, "Cell('AK47').column instanceof Column");
    assert.ok(AFNum.Cell("A1").column.number == 1, "Cell('A1').column.number == 1");
    assert.ok(AFNum.Cell("AK47").column.number == 37, "Cell('AK47').row.number == 37");
  });

  QUnit.test( "Cell.inColumn", function( assert ) {
    assert.ok(AFNum.Cell('A1').inColumn(AFNum.Column('A')), "Cell('A1').inColumn(Column(A))");
    assert.ok(AFNum.Cell('A1').inColumn('A'), "Cell('A1').inColumn(A)");
    assert.ok(!AFNum.Cell('A1').inColumn('B'), "!Cell('A1').inColumn('B')");
  });

  QUnit.test( "Cell.inRow", function( assert ) {
    assert.ok(AFNum.Cell('A1').inRow(AFNum.Row(1)), "Cell('A1').inRow(Row(1))");
    assert.ok(AFNum.Cell('A1').inRow(1), "Cell('A1').inRow(1)");
    assert.ok(!AFNum.Cell('A1').inRow(2), "!Cell('A1').inRow(2)");
  });


  QUnit.test( "Cell.hasCell", function( assert ) {
    assert.ok(AFNum.Cell('A1').hasCell('A1'), "Cell('A1').hasCell('A1')");
    assert.ok(!AFNum.Cell('B1').hasCell('A1'), "!Cell('B1').hasCell('A1')");
  });

  QUnit.test("Cell.increment", function(assert) {
    assert.ok(AFNum.Cell('A1').increment(1).string == 'A2', "Cell('A1').increment(1) == 'A2'");
    assert.ok(AFNum.Cell('A1').increment(1,0).string == 'A2', "Cell('A1').increment(1,0) == 'A2'");
    assert.ok(AFNum.Cell('A1').increment(0,1).string == 'B1', "Cell('A1').increment(1) == 'B1'");
    assert.ok(AFNum.Cell('A1').increment(1,1).string == 'B2', "Cell('A1').increment(1,1) == 'B2'");

    assert.ok(AFNum.Cell('A1').increment(-1,0) == null, "Cell('A1').increment(-1,0) == null");
    assert.ok(AFNum.Cell('A1').increment(0,-1) == null, "Cell('A1').increment(0, -1) == null");
    assert.ok(AFNum.Cell('A1').increment(-1,-1) == null, "Cell('A1').increment(-1, -1) == null");

    assert.ok(AFNum.Cell('B2').increment(-1).string == 'B1', "Cell('B2').increment(-1) == 'B1'");
    assert.ok(AFNum.Cell('B2').increment(-1,0).string == 'B1', "Cell('B2').increment(-1,0) == 'B1'");
    assert.ok(AFNum.Cell('B2').increment(0,-1).string == 'A2', "Cell('B2').increment(0, -1) == 'A2'");
    assert.ok(AFNum.Cell('B2').increment(-1,-1).string == 'A1', "Cell('A1').increment(-1, -1) == 'A1'");
  })

  QUnit.test( "Cell.cellsInRange", function( assert ) {
    assert.ok(AFNum.Cell('B2').cellsInRange('A1:A1').cardinality == 0, "Cell('B2').cellsInRange('A1:A1').cardinality == 0");
    assert.ok(AFNum.Cell('A1').cellsInRange('A1:A1').cardinality == 1, "Cell('B2').cellsInRange('A1:A1').cardinality == 0");
    assert.ok(~AFNum.Cell('A1').cellsInRange('A1:A1').strarray().indexOf('A1'), "Cell('A1').cellsInRange('A1:A1').indexOf('A1')");

    assert.ok(AFNum.Cell('A1').cellsInRange('A1:B2').cardinality == 1, "Cell('A1').cellsInRange('A1:B2').cardinality == 1");
    assert.ok(~AFNum.Cell('A1').cellsInRange('A1:B2').strarray().indexOf('A1'), "Cell('A1').cellsInRange('A1:B2').indexOf('A1')");

    assert.ok(AFNum.Cell('B2').cellsInRange('A1:B2').cardinality == 1, "Cell('B2').cellsInRange('A1:B2').cardinality == 1");
    assert.ok(~AFNum.Cell('B2').cellsInRange('A1:B2').strarray().indexOf('B2'), "Cell('B2').cellsInRange('A1:B2').indexOf('B2')");
  });

  QUnit.module('Range');

  QUnit.test( "Range", function( assert ) {
    assert.ok(AFNum.Range('A1') == null, "Range('A1') == null");
    assert.ok(AFNum.Range() == null, "Range() == null");
    assert.ok(AFNum.Range('') == null, "Range('') == null");

    assert.ok(AFNum.Range('A1:B22') instanceof AFNum.Range, "Range('A1:B22') instanceof Range");
    assert.ok(AFNum.Range(AFNum.Range('A1:B22')) instanceof AFNum.Range, "Range(Range('A1:B22')) instanceof Range");
  });

  QUnit.test( "Range.width", function( assert ) {
    assert.ok(AFNum.Range('A1:B23').width == 2 , "Range('A1:B23').width == 2");
    assert.ok(AFNum.Range('A1:A1').width == 1 , "Range('A1:A1').width == 1");
    assert.ok(AFNum.Range('B23:A1').width == 2 , "Range('B23:A1').width == 2");
  });

  QUnit.test( "Range.height", function( assert ) {
    assert.ok(AFNum.Range('A1:B23').height == 23 , "Range('A1:B23').height == 23");
    assert.ok(AFNum.Range('A1:A1').height == 1 , "Range('A1:A1').height == 1");
    assert.ok(AFNum.Range('B23:A1').height == 23 , "Range('B23:A1').height == 23");
  });

  QUnit.test( "Range.size", function( assert ) {
    assert.ok(AFNum.Range('A1:B23').size == 46 , "Range('A1:B23').size == 46");
    assert.ok(AFNum.Range('A1:A1').size == 1, "Range('A1:A1').size == 1");
    assert.ok(AFNum.Range('B23:A1').size == 46 , "Range('B23:A1').size == 46");
  });

  QUnit.test("Range.string", function(assert) {
    assert.ok(AFNum.Range('A7:B23').string == 'A7:B23', "Range('A7:B23').string == 'A7:B23'");
    assert.ok(AFNum.Range('a7:B23').string == 'A7:B23', "Range('a7:B23').string == 'A7:B23'");
    assert.ok(AFNum.Range('B23:A7').string == 'B23:A7', "Range('B23:A7').string == 'B23:A7'");
    assert.ok(AFNum.Range('Z4:AK47').string == 'Z4:AK47', "Range('Z4:AK47').string == 'Z4:AK47'");
  });

  QUnit.test( "Range.rightColumn", function( assert ) {
    assert.ok(AFNum.Range('A1:B23').rightColumn.string == 'B' , "Range('A1:B23').rightColumn == 'B'");
    assert.ok(AFNum.Range('A1:A1').rightColumn.string == 'A' , "Range('A1:A1').rightColumn == 'A'");
    assert.ok(AFNum.Range('B23:A1').rightColumn.string == 'B' , "Range('B23:A1').rightColumn == 'B'");
  });

  QUnit.test( "Range.leftColumn", function( assert ) {
    assert.ok(AFNum.Range('A1:B23').leftColumn.string == 'A' , "Range('A1:B23').leftColumn == 'A'");
    assert.ok(AFNum.Range('A1:A1').leftColumn.string == 'A' , "Range('A1:A1').leftColumn == 'A'");
    assert.ok(AFNum.Range('B23:A1').leftColumn.string == 'A' , "Range('B23:A1').leftColumn == 'A'");
  });

  QUnit.test( "Range.topRow", function( assert ) {
    assert.ok(AFNum.Range('A1:B23').topRow.number == 1 , "Range('A1:B23').topRow == 1");
    assert.ok(AFNum.Range('A1:A1').topRow.number == 1 , "Range('A1:A1').topRow == 1");
    assert.ok(AFNum.Range('B23:A1').topRow.number == 1 , "Range('B23:A1').topRow == 1");
  });

  QUnit.test( "Range.bottomRow", function( assert ) {
    assert.ok(AFNum.Range('A1:B23').bottomRow.number == 23 , "Range('A1:B23').bottomRow == 23");
    assert.ok(AFNum.Range('A1:A1').bottomRow.number == 1 , "Range('A1:A1').bottomRow == 1");
    assert.ok(AFNum.Range('B23:A1').bottomRow.number == 23 , "Range('B23:A1').bottomRow == 23");
  });

  QUnit.test( "Range.hasColumn", function( assert ) {
    assert.ok(AFNum.Range('A1:B23').hasColumn('A'), "Range('A1:B23').hasColumn('A')");
    assert.ok(AFNum.Range('A1:B23').hasColumn('B'), "Range('A1:B23').hasColumn('B')");
    assert.ok(!AFNum.Range('A1:B23').hasColumn('C'), "!Range('A1:B23').hasColumn('C')");

    assert.ok(AFNum.Range('A1:A1').hasColumn('A') , "Range('A1:A1').hasColumn('A')");
    assert.ok(!AFNum.Range('A1:A1').hasColumn('B') , "!Range('A1:A1').hasColumn('B')");

    assert.ok(AFNum.Range('B23:A1').hasColumn('A') , "Range('B23:A1').hasColumn('A')");
    assert.ok(AFNum.Range('B23:A1').hasColumn('B') , "Range('B23:A1').hasColumn('B')");
    assert.ok(!AFNum.Range('B23:A1').hasColumn('C') , "!Range('B23:A1').hasColumn('C')");
  });

  QUnit.test( "Range.hasRow", function( assert ) {
    assert.ok(!AFNum.Range('A7:B23').hasRow(6), "!Range('A7:B23').hasRow(6)");
    assert.ok(AFNum.Range('A7:B23').hasRow(7), "Range('A7:B23').hasRow(7)");
    assert.ok(AFNum.Range('A7:B23').hasRow(23), "Range('A7:B23').hasRow(23)");
    assert.ok(!AFNum.Range('A7:B23').hasRow(24), "!Range('A7:B23').hasRow(24)");

    assert.ok(!AFNum.Range('A7:A7').hasRow(6) , "!Range('A7:A7').hasRow(6)");
    assert.ok(AFNum.Range('A7:A7').hasRow(7) , "Range('A7:A7').hasRow(7)");
    assert.ok(!AFNum.Range('A7:A7').hasRow(8) , "!Range('A7:A7').hasRow(8)");

    assert.ok(!AFNum.Range('B23:A7').hasRow(6) , "Range('B23:A7').hasRow(6)");
    assert.ok(AFNum.Range('B23:A7').hasRow(7) , "Range('B23:A7').hasRow(7)");
    assert.ok(AFNum.Range('B23:A7').hasRow(23) , "Range('B23:A1').hasRow(23)");
    assert.ok(!AFNum.Range('B23:A7').hasRow(24) , "!Range('B23:A1').hasRow(24)");
  });


  QUnit.test( "Range.hasCell", function( assert ) {
    assert.ok(!AFNum.Range('B2:D4').hasCell('A1'), "!Range('B2:D4').hasCell('A1')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('B1'), "!Range('B2:D4').hasCell('B1')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('C1'), "!Range('B2:D4').hasCell('C1')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('D1'), "!Range('B2:D4').hasCell('D1')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('E1'), "!Range('B2:D4').hasCell('E1')");

    assert.ok(!AFNum.Range('B2:D4').hasCell('A2'), "!Range('B2:D4').hasCell('A2')");
    assert.ok(AFNum.Range('B2:D4').hasCell('B2'), "Range('B2:D4').hasCell('B2')");
    assert.ok(AFNum.Range('B2:D4').hasCell('C2'), "Range('B2:D4').hasCell('C2')");
    assert.ok(AFNum.Range('B2:D4').hasCell('D2'), "Range('B2:D4').hasCell('D2')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('E2'), "!Range('B2:D4').hasCell('E2')");


    assert.ok(!AFNum.Range('B2:D4').hasCell('A3'), "!Range('B2:D4').hasCell('A3')");
    assert.ok(AFNum.Range('B2:D4').hasCell('B3'), "Range('B2:D4').hasCell('B3')");
    assert.ok(AFNum.Range('B2:D4').hasCell('C3'), "Range('B2:D4').hasCell('C3')");
    assert.ok(AFNum.Range('B2:D4').hasCell('D3'), "Range('B2:D4').hasCell('D3')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('E3'), "!Range('B2:D4').hasCell('E3')");

    assert.ok(!AFNum.Range('B2:D4').hasCell('A4'), "!Range('B2:D4').hasCell('A4')");
    assert.ok(AFNum.Range('B2:D4').hasCell('B4'), "Range('B2:D4').hasCell('B4')");
    assert.ok(AFNum.Range('B2:D4').hasCell('C4'), "Range('B2:D4').hasCell('C4')");
    assert.ok(AFNum.Range('B2:D4').hasCell('D4'), "Range('B2:D4').hasCell('D4')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('E4'), "!Range('B2:D4').hasCell('E4')");

    assert.ok(!AFNum.Range('B2:D4').hasCell('A5'), "!Range('B2:D4').hasCell('A5')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('B5'), "!Range('B2:D4').hasCell('B5')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('C5'), "!Range('B2:D4').hasCell('C5')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('D5'), "!Range('B2:D4').hasCell('D5')");
    assert.ok(!AFNum.Range('B2:D4').hasCell('E5'), "!Range('B2:D4').hasCell('E5')");
  });

  QUnit.test( "Range.rows", function( assert ) {
    assert.ok(~AFNum.Range('B2:D4').rows.has(2), "Range('B2:D4').rows.has(2)");
    assert.ok(~AFNum.Range('B2:D4').rows.has(3), "Range('B2:D4').rows.has(3)");
    assert.ok(~AFNum.Range('B2:D4').rows.strarray().indexOf('4'), "Range('B2:D4').rows.strarray().indexOf('4')");
  });

  QUnit.test( "Range.columns", function( assert ) {
    assert.ok(~AFNum.Range('B2:D4').columns.strarray().indexOf('B'), "Range('B2:D4').columns.strarray().indexOf('B')");
    assert.ok(~AFNum.Range('B2:D4').columns.strarray().indexOf('C'), "Range('B2:D4').columns.strarray().indexOf('C')");
    assert.ok(~AFNum.Range('B2:D4').columns.strarray().indexOf('D'), "Range('B2:D4').columns.strarray().indexOf('D')");
  });

  QUnit.test( "Range.cells", function( assert ) {
    assert.ok(!~AFNum.Range('B2:C4').cells.strarray().indexOf('A1'), "!Range('B2:D4').columns.strarray().indexOf('A1')");
    assert.ok(~AFNum.Range('B2:C4').cells.strarray().indexOf('B2'), "Range('B2:D4').columns.strarray().indexOf('B2')");
    assert.ok(~AFNum.Range('B2:C4').cells.strarray().indexOf('B3'), "Range('B2:D4').columns.strarray().indexOf('B3')");
    assert.ok(~AFNum.Range('B2:C4').cells.strarray().indexOf('B4'), "Range('B2:D4').columns.strarray().indexOf('B4')");
    assert.ok(~AFNum.Range('B2:C4').cells.strarray().indexOf('C2'), "Range('B2:D4').columns.strarray().indexOf('C2')");
    assert.ok(~AFNum.Range('B2:C4').cells.strarray().indexOf('C3'), "Range('B2:D4').columns.strarray().indexOf('C3')");
    assert.ok(~AFNum.Range('B2:C4').cells.strarray().indexOf('C4'), "Range('B2:D4').columns.strarray().indexOf('C4')");
    assert.ok(!~AFNum.Range('B2:C4').cells.strarray().indexOf('C5'), "!Range('B2:D4').columns.strarray().indexOf('C5')");
  });

  QUnit.test( "Range.extend", function( assert ) {
    assert.ok(AFNum.Range("A1:A1").extend().cells.matches(AFNum.Range('A1:A1').cells), "Range('A1:A1').extend() == Range('A1:A1')");
    assert.ok(AFNum.Range("A1:A1").extend(0,0).cells.matches(AFNum.Range('A1:A1').cells), "Range('A1:A1').extend(0,0) == Range('A1:A1')");
    assert.ok(AFNum.Range("A1:A1").extend(1,0).cells.matches(AFNum.Range('A1:A2').cells), "Range('A1:A1').extend(1,0) == Range('A1:A2')");
    assert.ok(AFNum.Range("A1:A1").extend(0,1).cells.matches(AFNum.Range('A1:B1').cells), "Range('A1:A1').extend(0,1) == Range('B1:B2')");
    assert.ok(AFNum.Range("A1:A1").extend(1,1).cells.matches(AFNum.Range('A1:B2').cells), "Range('A1:A1').extend(1,1) == Range('A1:B2')");
    assert.ok(AFNum.Range("A1:B2").extend(1,0).cells.matches(AFNum.Range('A1:B3').cells), "Range('A1:B2').extend(1,0) == Range('A1:B3')");
    assert.ok(AFNum.Range("A1:B2").extend(0,1).cells.matches(AFNum.Range('A1:C2').cells), "Range('A1:B2').extend(0,1) == Range('A1:C2')");
    assert.ok(AFNum.Range("A1:B2").extend(1,1).cells.matches(AFNum.Range('A1:C3').cells), "Range('A1:B2').extend(1,1) == Range('A1:C3')");

    assert.ok(AFNum.Range("A1:B2").extend(-1,0).cells.matches(AFNum.Range('A1:B1').cells), "Range('A1:B2').extend(-1,0) == Range('A1:B1')");
    assert.ok(AFNum.Range("A1:B2").extend(0,-1).cells.matches(AFNum.Range('A1:A2').cells), "Range('A1:B2').extend(0,1) == Range('A1:A2')");
    assert.ok(AFNum.Range("A1:B2").extend(-1,-1).cells.matches(AFNum.Range('A1:A1').cells), "Range('A1:B2').extend(-1,1) == Range('A1:A1')");
    assert.ok(AFNum.Range("A1:B2").extend(-2,-2).cells.matches(AFNum.Range('A1:A1').cells), "Range('A1:B2').extend(-2,2) == Range('A1:A1')");

    assert.ok(AFNum.Range("B2:A1").extend(1,0) == null, "Range('B2:A1').extend(1,0) == null");
    assert.ok(AFNum.Range("B2:A1").extend(0,1) == null, "Range('B2:A1').extend(0,1) == null");
    assert.ok(AFNum.Range("B2:A1").extend(1,1) == null, "Range('B2:A1').extend(1,1) == null");

    assert.ok(AFNum.Range("B2:A1").extend(-1,-1).cells.matches(AFNum.Range('B2:B2').cells), "Range('B2:A1').extend(-1,-1) == Range('B2:B2')");
    assert.ok(AFNum.Range("B2:A1").extend(-1,0).cells.matches(AFNum.Range('B2:A2').cells), "Range('B2:A1').extend(-1,0) == Range('B2:A2')");
    assert.ok(AFNum.Range("B2:A1").extend(0,-1).cells.matches(AFNum.Range('B2:B1').cells), "Range('B2:A1').extend(0,-1) == Range('B2:B1')");

    assert.ok(AFNum.Range("B3:C2").extend(1,0).cells.matches(AFNum.Range('B3:C1').cells), "Range('B3:C2').extend(1,0) == Range('B3:C1')");
    assert.ok(AFNum.Range("B3:C2").extend(0,1).cells.matches(AFNum.Range('B3:D2').cells), "Range('B3:C2').extend(1,0) == Range('B3:D2')");
    assert.ok(AFNum.Range("B3:C2").extend(1,1).cells.matches(AFNum.Range('B3:D1').cells), "Range('B3:C2').extend(1,0) == Range('B3:D1')");

    assert.ok(AFNum.Range("C2:B3").extend(1,0).cells.matches(AFNum.Range('C2:B4').cells), "Range('B3:C2').extend(1,0) == Range('C2:B4')");
    assert.ok(AFNum.Range("C2:B3").extend(0,1).cells.matches(AFNum.Range('C2:A3').cells), "Range('B3:C2').extend(1,0) == Range('C2:A3')");
    assert.ok(AFNum.Range("C2:B3").extend(1,1).cells.matches(AFNum.Range('C2:A4').cells), "Range('B3:C2').extend(1,0) == Range('C2:A4')");
  });

  QUnit.test( "Range.cellsInRange", function( assert ) {


    assert.ok(AFNum.Range("A1:A1").cellsInRange('B1:B1').cardinality == 0, "Range('A1:A1').cellsInRange('B1:B1').cardinality == 0");
    assert.ok(AFNum.Range("A1:A1").cellsInRange('A1:A1').cardinality == 1, "Range('A1:A1').cellsInRange('A1:A1').cardinality == 1");

    var cells = AFNum.Range("A1:C3").cellsInRange('B2:D4');

    assert.ok(cells.has('B2') && cells.has('B3') && cells.has('C2') && cells.has('C3'), "Range('A1:C3').cellsInRange('B2:D4') ~= [ 'B2', 'B3', 'C2', 'C3']");
  });

  QUnit.module('Collection');

  QUnit.test( "Collection", function( assert ) {
    assert.ok(AFNum.Collection() instanceof AFNum.Collection, "Collection() instanceof Collection");
    assert.ok(AFNum.Collection('A') instanceof AFNum.Collection, "Collection('A') instanceof Collection");
    assert.ok(AFNum.Collection('A', 'B', 'C') instanceof AFNum.Collection, "Collection('A', 'B', 'C') instanceof Collection");
    assert.ok(AFNum.Collection('A1', 'B') instanceof AFNum.Collection, "Collection('A1', 'B') instanceof Collection");
    assert.ok(AFNum.Collection(['A1', 'B']) instanceof AFNum.Collection, "Collection(['A1', 'B']) instanceof Collection");
  });



  QUnit.test( "Collection.cardinality", function( assert ) {
    assert.ok(AFNum.Collection().cardinality == 0, "Collection().cardinality == 0");
    assert.ok(AFNum.Collection('A').cardinality == 1, "Collection('A').cardinality == 1");
    assert.ok(AFNum.Collection('A', 'B', 'C').cardinality == 3, "Collection('A', 'B', 'C').cardinality == 3");
    assert.ok(AFNum.Collection('A1', 'B').cardinality == 2, "Collection('A1', 'B').cardinality == 2");
    assert.ok(AFNum.Collection('A1', 1).cardinality == 2, "Collection('A1', 1).cardinality == 2");
    assert.ok(AFNum.Collection('A1:B3', 1).cardinality == 2, "Collection('A1:B3', 1).cardinality == 2");
  });

  QUnit.test( "Collection.matches", function( assert ) {
    assert.ok(AFNum.Collection().matches([]), "Collection().matches([])");

    assert.ok(AFNum.Collection('A1').matches('A1'), "Collection('A1').matches('A1')");
    assert.ok(AFNum.Collection('A1').matches(AFNum.Collection('A1')), "Collection('A1').matches(Collection('A1'))");
    assert.ok(!AFNum.Collection('A1').matches(['A1', 'B1']), "Collection('A1').matches(['A1', 'B1'])");
    assert.ok(!AFNum.Collection('A1').matches(1), "!Collection('A1').matches(1)");
    assert.ok(AFNum.Collection('A1:B2').matches('A1:B2'), "Collection('A1:B2').matches(A1:B2)");

    assert.ok(AFNum.Collection(1).matches(1), "Collection(1).matches(1)");
    assert.ok(!AFNum.Collection(1).matches(2), "!Collection(1).matches(2)");

    assert.ok(!AFNum.Collection(['A1', 'B1']).matches(), "!Collection(['A1', 'B1']).matches()");
    assert.ok(!AFNum.Collection(['A1', 'B1']).matches('A1'), "!Collection(['A1', 'B1']).matches('A1')");
    assert.ok(!AFNum.Collection(['A1', 'B1']).matches('A1', 'B1'), "!Collection(['A1', 'B1']).matches('A1', 'B1')");
    assert.ok(AFNum.Collection(['A1', 'B1']).matches(['A1', 'B1']), "Collection(['A1', 'B1']).matches(['A1', 'B1'])");
    assert.ok(AFNum.Collection(['A1', 'B1']).matches(AFNum.Collection('A1', 'B1')), "Collection(['A1', 'B1']).matches(Collection('A1', 'B1'))");
    assert.ok(AFNum.Collection(['A1', 'B1']).matches(['B1', 'B1', 'A1']), "Collection(['A1', 'B1']).matches(['B1', 'A1', 'A1'])");
  });

  QUnit.test("Collection.add", function(assert) {
    assert.ok(AFNum.Collection().add([]).matches([]), "Collection().add([]).matches([])");
    assert.ok(AFNum.Collection().add('A').matches('A'), "Collection().add('A').matches('A')");
    assert.ok(AFNum.Collection().add('A2').matches('A2'), "Collection().add('A2').matches('A2')");
    assert.ok(AFNum.Collection().add(2).matches(2), "Collection().add(2).matches(2)");
    assert.ok(AFNum.Collection().add(2).add(3).matches([2,3]), "Collection().add(2).add(3).matches([2,3])");
    assert.ok(AFNum.Collection().add(['A1', 'A']).matches(['A1', 'A']), "Collection().add(['A1', 'A']).matches(['A1', 'A'])");
    assert.ok(AFNum.Collection().add(['A1']).matches(['A1']), "Collection().add(['A1']).matches(['A1'])");
    assert.ok(AFNum.Collection().add(AFNum.Collection('A1', 'A2')).matches(['A1', 'A2']), "Collection().add(Collection('A1', 'A2')).matches(['A1', 'A2'])");
  });

  QUnit.test("Collection.remove", function(assert) {
    assert.ok(AFNum.Collection().add('A').remove('A').cardinality == 0, "Collection().add('A').remove('A').cardinality == 0");
    assert.ok(AFNum.Collection().add('A').remove('B').cardinality == 1, "Collection().add('A').remove('B').cardinality == 1");
  });

  QUnit.test("Collection.has", function(assert) {
    assert.ok(AFNum.Collection('A').has('A'), "Collection('A').has('A')");
    assert.ok(!AFNum.Collection('A').has('B'), "!Collection('A').has('B')");
    assert.ok(AFNum.Collection('A2').has('A2'), "Collection('A2').has('A2')");
    assert.ok(AFNum.Collection(2).has(2), "Collection(2).has(2)");
    assert.ok(AFNum.Collection(2,3).has(2), "Collection(2,3).has(2)");
    assert.ok(!AFNum.Collection(2,3).has(1), "!Collection(2,3).has(1)");
  });

  QUnit.test("Collection.maxRow", function(assert) {
    assert.ok(AFNum.Collection().maxRow == null, "!Collection().maxRow");
    assert.ok(AFNum.Collection(1).maxRow.number == 1, "Collection(1).maxRow.number == 1");
    assert.ok(AFNum.Collection('A').maxRow == null, "!Collection('A').maxRow");
    assert.ok(AFNum.Collection('A1').maxRow.number ==1, "Collection('A1').maxRow == 1");
    assert.ok(AFNum.Collection('C3:B2').maxRow.number == 3, "Collection('C3:B2').maxRow == 3" );
    assert.ok(AFNum.Collection(['A1', 'B2']).maxRow.number == 2, "Collection(['A1', 'B2']).maxRow = 2");
    assert.ok(AFNum.Collection(['A', 'B', 'C4']).maxRow.number == 4, "Collection(['A', 'B', 'C4']).maxRow == 4");
  });

  QUnit.test("Collection.maxColumn", function(assert) {
    assert.ok(AFNum.Collection().maxColumn == null, "!Collection().maxColumn");
    assert.ok(AFNum.Collection(1).maxColumn == null, "!Collection(1).maxColumn");
    assert.ok(AFNum.Collection('A').maxColumn.string == 'A', "Collection('A').maxColumn  == 'A'");
    assert.ok(AFNum.Collection('A1').maxColumn.string == 'A', "Collection('A1').maxColumn == 'A'" );
    assert.ok(AFNum.Collection('C3:B2').maxColumn.string == 'C', "Collection('C3:B2').maxColumn == 'C'" );
    assert.ok(AFNum.Collection(['A1', 'B2']).maxColumn.string == 'B', "Collection(['A1', 'B2'].maxColumn == 'B'" );
    assert.ok(AFNum.Collection(['A', 'B', 'C4']).maxColumn.string == 'C', "Collection(['A', 'B', 'C4']).maxColumn == 'C'");
  });

  QUnit.module('AFNum');

  QUnit.test( "AFNum", function( assert ) {
    assert.ok(AFNum() == null, "AFNum() == null");
    assert.ok(AFNum('A') instanceof AFNum.Column, "AFNum('A') instanceof Column");
    assert.ok(AFNum('A').string == 'A', "AFNum('A') == 'A'");
    assert.ok(AFNum(1) instanceof AFNum.Row, "AFNum(1) instanceof Row");
    assert.ok(AFNum(1).string == '1', "AFNum(1).string == '1'");
    assert.ok(AFNum('A1') instanceof AFNum.Cell, "AFNum('A1') instanceof Cell");
    assert.ok(AFNum('A1').string == 'A1', "AFNum(1).string == 'A1'");
    assert.ok(AFNum('A1:B22') instanceof AFNum.Range, "AFNum('A1:B22') instanceof Range");
    assert.ok(AFNum('A1:B22').string == 'A1:B22', "AFNum('A1:B22').string == 'A1:B22'");
  });

  QUnit.load();

})
