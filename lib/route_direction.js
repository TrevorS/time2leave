'use strict';

module.exports = RouteDirection;

function RouteDirection(code, name) {
  this.code = code;
  this.name = name;
}

RouteDirection.createRouteDirections = function createRouteDirections(routeDirections) {
  return routeDirections.map(function (e) {
    return new RouteDirection(e.$.Code, e.$.Name);
  });
};

RouteDirection.prototype.getCode = function getCode() {
  return this.code;
};

RouteDirection.prototype.getName = function getName() {
  return this.name;
};
