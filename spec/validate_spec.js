(function(factory) {

  if (typeof module !== 'undefined' && module && module.exports) { // Node.js & CommonJS
    var qunit = QUnit || require('qunitjs');
    var afnum = require('../afnum.js');
    module.exports = factory(qunit, afnum);
  } else if (typeof define === 'function' && define.amd) { // Require.js & AMD

    define([ 'qunit', 'afnum'], function(qunit, afnum) {
      factory(qunit, afnum);
    });
  } else { // Browser
    factory(QUnit, AFNum);
  }
})(function(QUnit, AFNum) {

  QUnit.module('Range');

  QUnit.test("isValid", function( assert ) {
    assert.ok(AFNum.Range.isValid('A1:A1') == true, "Range.isValid(A1:A1)" );
    assert.ok(AFNum.Range.isValid('B1:ZZ23') == true, "Range.isValid(B1:ZZ23)" );
    assert.ok(AFNum.Range.isValid('B1:23') == false, "!Range.isValid(B1:23)" );
    assert.ok(AFNum.Range.isValid('B1') == false, "!Range.isValid(B1)" );   
  });
});
