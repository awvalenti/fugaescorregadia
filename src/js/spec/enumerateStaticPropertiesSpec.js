define([
  'enumerate'
],
function(
  enumerate
) {
  'use strict';

  describe('enumerate: static properties', function() {

    var Honorific = enumerate(
      {
        constructor: function(abbreviation) {
          this.abbreviation = abbreviation;
        }
      },

      'MISS',   ['Ms'],
      'MISTER', ['Mr'],

      {
        byAbbreviation: function(abbreviation) {
          for (var name in this.values()) {
            var honorific = this.values()[name];
            if (honorific.abbreviation === abbreviation) return honorific;
          }
          return null;
        }
      }
    );

    describe('enums', function() {
      it('should allow static properties', function() {
        expect(Honorific.byAbbreviation('Mr')).toBe(Honorific.MISTER);
      });
    });
  });

});
