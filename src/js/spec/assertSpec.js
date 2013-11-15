define([
  'assert'
],
function(
  assert
) {
  'use strict';

  describe('assert', function() {

    describe('as a function (for general purpose validation)', function() {
      it('should not throw error in case of truthy condition', function() {
        expect(function() { assert(true, 'No error 1'); }).not.toThrow();
        expect(function() { assert({},   'No error 2'); }).not.toThrow();
      });

      it('should throw error with desired message in case of falsy condition', function() {
        expect(function() { assert(false,     'Error message 1'); }).toThrow('Error message 1');
        expect(function() { assert(undefined, 'Error message 2'); }).toThrow('Error message 2');
      });

      it('should allow calls without any message', function() {
        expect(function() { assert(true);  }).not.toThrow();
        expect(function() { assert(false); }).toThrow(Error());
      });

      it('should allow specifying message as varargs (useful for variables)', function() {
        var myVar = 1;
        expect(function() { assert(myVar === 2, 'Error: expected 2, but got', myVar); }).toThrow('Error: expected 2, but got 1');
      });
    });

    describe('.args (for validation of function arguments)', function() {
      describe('when used correctly, e.g.:', function() {
        describe("assert.args(username, 'string', amount, 'number', useOverdraft, 'boolean');", function() {

          function withdrawMoney(username, amount, useOverdraft) {
            assert.args(username, 'string', amount, 'number', useOverdraft, 'boolean');
          }

          function strNumBool() {
            var args = arguments;
            return function() { withdrawMoney.apply(null, args); };
          }

          describe('with valid arguments types', function() {
            it('should not throw error', function() {
              expect(strNumBool('eddie', 5.00, false)).not.toThrow();
              expect(strNumBool('rose', 200000, true)).not.toThrow();
            });
          });

          describe('with invalid arguments types', function() {
            it('should throw error describing divergences', function() {
              expect(strNumBool('andre', 'oops', false)).toThrow('Expected arg[1] number, got string.');
              expect(strNumBool('andre', 'ooooops', {})).toThrow('Expected arg[1] number, got string. Expected arg[2] boolean, got object.');
            });
          });
        });
      });

      describe('when used incorrectly', function() {
        describe('with odd number of arguments, e.g.:', function() {
          describe("assert.args(arg);", function() {
            it('should throw informative error', function() {
              var arg = 0;
              expect(function() { assert.args(arg); })
                  .toThrow('assert.args used incorrectly. Expected even number of arguments, got 1.');
            });
          });
        });

        describe('with invalid type, e.g.:', function() {
          describe("assert.args(arg0, 'number', arg1, 'bogusType');", function() {
            it('should throw informative error', function() {
              var arg0 = 0, arg1 = 1;
              expect(function() { assert.args(arg0, 'number', arg1, 'bogusType'); })
                  .toThrow('assert.args used incorrectly. Expected a valid typeof result, got bogusType. ' +
                      'Valid results are: number, string, boolean, object, function, undefined, xml.');
            });
          });
        });
      });
    });

  });

});
