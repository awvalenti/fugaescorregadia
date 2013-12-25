define([
  'enumerate'
],
function(
  enumerate
) {
  'use strict';

  describe('enumerate', function() {

    var Parity    = null;
    var Direction = null;
    var Signal    = null;

    beforeEach(function() {
      Parity    = enumerate('EVEN', 'ODD');

      Direction = enumerate({
          inheritedProperty: 'inherited'
        },
        'LEFT', {
          ownProperty: 'own',
          getXIncrement: function() { return -1; }
        },

        'RIGHT', {
          inheritedProperty: 'overriden',
          getXIncrement: function() { return +1; }
        }
      );

      Signal = enumerate(
        function(factor) {
          this.factor = factor;
        },

        'MINUS', [-1],

        'PLUS', [+1]
      );
    });

    describe('enums', function() {
      it('should allow direct access to constants', function() {
        expect(Parity.EVEN).toBeDefined();
        expect(Parity.ODD).toBeDefined();
        expect(Direction.LEFT).toBeDefined();
        expect(Direction.RIGHT).toBeDefined();
      });

      it('should have values()', function() {
        expect(Parity.values()).toEqual([Parity.EVEN, Parity.ODD]);
        expect(Direction.values()).toEqual([Direction.LEFT, Direction.RIGHT]);
      });

      it('should have different constructors', function() {
        expect(Parity).not.toBe(Direction);
      });

      it('should add properties to prototype', function() {
        expect(Direction.prototype.inheritedProperty).toBeDefined();
      });

    });

    describe('constants', function() {
      it('should have name()', function() {
        expect(Parity.EVEN.name()).toBe('EVEN');
        expect(Direction.LEFT.name()).toBe('LEFT');
      });

      it('should have ordinal()', function() {
        expect(Parity.EVEN.ordinal()).toBe(0);
        expect(Parity.ODD.ordinal()).toBe(1);
        expect(Direction.LEFT.ordinal()).toBe(0);
        expect(Direction.RIGHT.ordinal()).toBe(1);
      });

      it('should have default toString() equal to name()', function() {
        expect(Parity.ODD.toString()).toBe(Parity.ODD.name());
        expect(Direction.RIGHT.toString()).toBe(Direction.RIGHT.name());
      });

      it('should be instanceof their enum', function() {
        expect(Parity.EVEN instanceof Parity).toBe(true);
        expect(Direction.LEFT instanceof Direction).toBe(true);
      });

      it('should access inherited properties', function() {
        expect(Direction.LEFT.inheritedProperty).toBe('inherited');
      });

      it('should access own properties', function() {
        expect(Direction.LEFT.ownProperty).toBe('own');
        expect(Direction.LEFT.getXIncrement()).toBe(-1);
      });

      it('should be able to override inherited properties', function() {
        expect(Direction.RIGHT.inheritedProperty).toBe('overriden');
      });

      it('should be able to send arguments to constructors', function() {
        expect(Signal.MINUS.factor).toBe(-1);
        expect(Signal.PLUS.factor).toBe(+1);
      });
    });

  });

});
