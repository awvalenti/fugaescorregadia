define([
  'prod/libs-originais/enumerate'
],
function(
  enumerate
) {
  'use strict';

  describe('enumerate: basic usage', function() {

    var Parity = enumerate('EVEN', 'ODD');

    describe('enums', function() {
      it('should allow direct access to their constants', function() {
        expect(Parity.EVEN).toBeDefined();
        expect(Parity.ODD).toBeDefined();
      });

      it('should allow access to all constants by calling values()', function() {
        expect(Parity.values()).toEqual([Parity.EVEN, Parity.ODD]);
      });

      it('should allow obtaining a constant from its name by calling forName(name) ' +
          '(could be valueOf, but this is a reserved method in JavaScript)', function() {
        expect(Parity.forName('EVEN')).toEqual(Parity.EVEN);
        expect(Parity.forName('ODD')).toEqual(Parity.ODD);
      });

      it('should prevent misspelling when calling forName(name)', function() {
        expect(function() { Parity.forName('OFF'); }).toThrow(
            "forName('OFF'): enum constant not found. Misspelling? Valid constants are EVEN, ODD.");
      });

      it('should prevent calling forName with non-string argument', function() {
        expect(function() { Parity.forName(Parity.EVEN); }).toThrow(
            'forName expected a string argument, but got object');
      });

    });

    describe('constants', function() {
      it('should have name() equal to declared name', function() {
        expect(Parity.EVEN.name()).toBe('EVEN');
      });

      it('should have ordinal() following a sequential order starting in 0', function() {
        expect(Parity.EVEN.ordinal()).toBe(0);
        expect(Parity.ODD.ordinal()).toBe(1);
      });

      it('should have a default toString() implementation which yields same result as name()', function() {
        expect(Parity.ODD.toString()).toBe(Parity.ODD.name());
      });

    });

  });

});
