define([
  'prod/libs-originais/enumerate'
],
function(
  enumerate
) {
  'use strict';

  describe('enumerate: instance properties', function() {

    var Direction = enumerate({
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

    describe('enums', function() {
      it('should add properties to prototype', function() {
        expect(Direction.prototype.inheritedProperty).toBe('inherited');
      });
    });

    describe('constants', function() {
      it('should have own properties', function() {
        expect(Direction.LEFT.ownProperty).toBe('own');
        expect(Direction.LEFT.getXIncrement()).toBe(-1);
      });

      it('should have inherited properties', function() {
        expect(Direction.LEFT.inheritedProperty).toBe('inherited');
      });

      it('should be able to override inherited properties', function() {
        expect(Direction.RIGHT.inheritedProperty).toBe('overriden');
      });

    });

  });

});
