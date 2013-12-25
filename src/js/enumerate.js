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

    if (typeof arguments[0] === 'object') augmentObject(newEnum.prototype, arguments[0]);

    var ordinal = 0;
    for (var i = 0; i < arguments.length; ++i) {
      var name = arguments[i];
      if (typeof name === 'string') {
        addConstant(newEnum, name, ordinal);
        if (typeof arguments[0] === 'function') arguments[0].apply(newEnum[name], arguments[i + 1]);
        if (typeof arguments[i + 1] === 'object') augmentObject(newEnum[name], arguments[i + 1]);
        ++ordinal;
      }
    };

    return newEnum;
  };

  function createUniqueEnum() {
    function Enum() { AbstractEnum.apply(this, arguments); }
    Enum.prototype = new AbstractEnum();
    Enum.prototype.constructor = Enum;

    Enum._values = [];
    Enum.values = values;

    return Enum;
  }

  function values() {
    return this._values;
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
