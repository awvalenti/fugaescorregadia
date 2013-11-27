define([
  'enumerate'
],
function(
  enumerate
) {
  'use strict';

  describe('enumerate', function() {

    var Parity = null;

    beforeEach(function() {
      Parity = enumerate('EVEN', 'ODD');
    });

    describe('enums', function() {
      it('should allow direct access to constants', function() {
        expect(Parity.EVEN).toBeDefined();
        expect(Parity.ODD).toBeDefined();
      });

      it('should have values()', function() {
        expect(Parity.values()).toEqual([Parity.EVEN, Parity.ODD]);
      });

      it('should have different constructors', function() {
        var NumberBases = enumerate('BINARY', 'OCTAL', 'DECIMAL', 'HEX');

        expect(Parity).not.toBe(NumberBases);
      });

    });

    describe('constants', function() {
      it('should have name()', function() {
        expect(Parity.EVEN.name()).toBe('EVEN');
      });

      it('should have ordinal()', function() {
        expect(Parity.EVEN.ordinal()).toBe(0);
        expect(Parity.ODD.ordinal()).toBe(1);
      });

      it('should have default toString() equal to name()', function() {
        expect(Parity.ODD.toString()).toBe(Parity.ODD.name());
      });

      it('should be instanceof their enum', function() {
        expect(Parity.EVEN instanceof Parity).toBe(true);
      });

    });

  });

});
