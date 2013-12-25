define([
  'enumerate'
],
function(
  enumerate
) {
  'use strict';

  describe('enumerate: constructors', function() {

    var Signal = enumerate(
      function(factor) {
        this.factor = factor;
      },

      'MINUS', [-1],

      'PLUS', [+1]
    );

    describe('enums', function() {
      it('should have different constructors', function() {
        expect(Signal).not.toBe(enumerate('EVEN', 'ODD'));
      });
    });

    describe('constants', function() {
      it('should be instanceof their enum', function() {
        expect(Signal.PLUS instanceof Signal).toBe(true);
      });

      it('should be able to call constructors', function() {
        expect(Signal.MINUS.factor).toBe(-1);
        expect(Signal.PLUS.factor).toBe(+1);
      });

    });

  });

});
