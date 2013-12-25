define([
  'enumerate'
],
function(
  enumerate
) {
  'use strict';

  describe('enumerate: constructors', function() {

    var Signal = enumerate({
        constructor: function(factor) {
          this.factor = factor;
        }
      },

      'MINUS', [-1],

      'PLUS', [+1], {
        ownProperty: 2
      }

    );

    describe('constants', function() {
      it('should be instanceof their enum', function() {
        expect(Signal.PLUS instanceof Signal).toBe(true);
      });

      it('should not be instanceof another enum', function() {
        expect(Signal.PLUS instanceof enumerate('EVEN', 'ODD')).toBe(false);
      });

      it('should be able to call constructor', function() {
        expect(Signal.MINUS.factor).toBe(-1);
      });

      it('should be able to call constructor and add new properties', function() {
        expect(Signal.PLUS.factor).toBe(+1);
        expect(Signal.PLUS.ownProperty).toBe(2);
      });

    });

  });

});
