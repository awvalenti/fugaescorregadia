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

  function values() {
    return this._values;
  }

  return function enumerate() {
    var constantsNames = arguments;

    function ConcreteEnum() { AbstractEnum.apply(this, arguments); }
    ConcreteEnum.prototype = new AbstractEnum();
    ConcreteEnum.prototype.constructor = ConcreteEnum;

    ConcreteEnum._values = [];

    for (var ordinal = 0; ordinal < constantsNames.length; ++ordinal) {
      var name = constantsNames[ordinal];
      ConcreteEnum[name] = new ConcreteEnum(name, ordinal);
      ConcreteEnum._values.push(ConcreteEnum[name]);
    }

    ConcreteEnum.values = values;

    return ConcreteEnum;
  };

});
