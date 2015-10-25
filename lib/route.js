'use strict';

module.exports = Route;

const RouteDirection = require('./route_direction.js');

function Route(name, code, routeDirections) {
  this.name = name;
  this.code = code;
  this.routeDirections = routeDirections;
}

Route.createRoutes = function createRoutes(response) {
  return response.RTT.AgencyList[0].Agency[0].RouteList[0].Route.map(function(route) {
    let routeDirections = RouteDirection
      .createRouteDirections(route.RouteDirectionList[0].RouteDirection);

    return new Route(route.$.Name, route.$.Code, routeDirections);
  });
};

Route.prototype.getName = function getName() {
  return this.name;
};

Route.prototype.getCode = function getCode() {
  return this.code;
};

Route.prototype.getRouteDirections = function getRouteDirections() {
  return this.routeDirections;
};
