define([
],
function(
) {
  'use strict';

  function AbstractEnum(name, ordinal) {
    this._name = name;
    this._ordinal = ordinal;
  }

  AbstractEnum.prototype.name = function() {
    return this._name;
  };

  AbstractEnum.prototype.ordinal = function() {
    return this._ordinal;
  };

  AbstractEnum.prototype.toString = function() {
    return this._name;
  };

  return function enumerate() {
    var newEnum = createUniqueEnum();
    var suppliedConstructor = null;

    if (typeof arguments[0] === 'object') {
      if (Object.prototype.hasOwnProperty.call(arguments[0], 'constructor')) {
        suppliedConstructor = arguments[0].constructor;
        delete arguments[0].constructor;
      }
      augmentObject(newEnum.prototype, arguments[0]);
    }

    var ordinal = 0;
    for (var i = 0; i < arguments.length; ++i) {
      var name = arguments[i];
      if (typeof name === 'string') {
        addConstant(newEnum, name, ordinal);
        if (suppliedConstructor) {
          suppliedConstructor.apply(newEnum[name], arguments[i + 1]);
          ++i;
        }
        if (typeof arguments[i + 1] === 'object') augmentObject(newEnum[name], arguments[i + 1]);
        ++ordinal;
      }
    };

    var staticProperties = arguments[arguments.length - 1];

    if (typeof staticProperties === 'object') augmentObject(newEnum, staticProperties);

    return newEnum;
  };

  function createUniqueEnum() {
    function Enum() { AbstractEnum.apply(this, arguments); }
    Enum.prototype = new AbstractEnum();
    Enum.prototype.constructor = Enum;

    Enum._values = [];
    Enum.values = values;
    Enum.forName = forName;

    return Enum;
  }

  function values() {
    return this._values;
  }

  function forName(name) {
    if (typeof name !== 'string') throw new Error('forName expected a string argument, but got ' + typeof name);

    var values = this._values;

    for (var i = 0; i < values.length; ++i) {
      var constant = values[i];
      if (constant._name === name) return constant;
    }

    throw new Error("forName('" + name + "'): enum constant not found. Misspelling? Valid constants are " +
        values.join(', ') + '.');
  }

  function addConstant(newEnum, name, ordinal) {
    var constant = new newEnum(name, ordinal);
    newEnum[name] = constant;
    newEnum._values.push(constant);
  }

  function augmentObject(dest, src) {
    for (var propName in src) {
      dest[propName] = src[propName];
    }
  }

});
