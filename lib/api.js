'use strict';

module.exports = API;

const Q           = require('q');
const request     = require('request');
const parseString = require('xml2js').parseString;

const Agency    = require('./agency.js');
const Route     = require('./route.js');
const Stop      = require('./stop.js');
const Departure = require('./departure.js');

function API(config) {
  this.baseURL = config.baseURL;
  this.token   = config.token;
  this.headers = config.headers;
}

API.prototype.getAgencies = function getAgencies() {
  let q = Q.defer();

  this.get('Agencies', {})
    .then((body) => q.resolve(Agency.createAgencies(body)));

  return q.promise;
};

API.prototype.getRoutesForAgency = function getRoutesForAgency(agencyName) {
  let q = Q.defer();

  this.get('RoutesForAgency', { agencyName: agencyName })
    .then((body) => q.resolve(Route.createRoutes(body)));

  return q.promise;
};

API.prototype.getRoutesForAgencies = function getRoutesForAgencies(agencyNames) {
  let q = Q.defer();

  let _agencyNames = this.formatAgencyNames(agencyNames);

  this.get('RoutesForAgencies', { agencyNames: _agencyNames })
    .then((body) => console.log('getRoutesForAgencies is not implemented yet.'))
    .then((body) => q.reject());

  return q.promise;
};

API.prototype.getStopsForRoute = function getStopsForRoute(agencyName, routeCode, routeDirectionCode) {
  let q = Q.defer();

  let _routeIDF = API.formatRouteIDF(agencyName, routeCode, routeDirectionCode);

  this.get('StopsForRoute', { routeIDF: _routeIDF })
    .then((body) => q.resolve(Stop.createStops(body)));

  return q.promise;
};

API.prototype.getStopsForRoutes = function getStopsForRoutes(routeIDFs) {
  let q = Q.defer();

  let _routeIDFs = this.formatRouteIDFs(routeIDFs);

  this.get('StopsForRoutes', { routeIDF: _routeIDFs })
    .then((body) => console.log('getStopsForRoutes is not implemented yet.'))
    .then((body) => q.reject());

  return q.promise;
};

API.prototype.getNextDeparturesByStopName = function getNextDeparturesByStopName(agencyName, stopName) {
  let q = Q.defer();

  this.get('NextDeparturesByStopName', { agencyName: agencyName, stopName: stopName })
    .then((body) => console.log('getNextDeparturesByStopName is not implemented yet.'))
    .then((body) => q.reject());

  return q.promise;
};

API.prototype.getNextDeparturesByStopCode = function getNextDeparturesByStopCode(stopCode) {
  let q = Q.defer();

  this.get('NextDeparturesByStopCode', { stopCode: stopCode })
    .then((body) => q.resolve(Departure.createDeparturesByStopCode(body)));

  return q.promise;
};

API.prototype.url = function url(endpoint) {
  return `http://${this.baseURL}/get${endpoint}.aspx`;
};

API.prototype.get = function get(endpoint, qs) {
  let q = Q.defer();

  let url = this.url(endpoint);

  qs.token = this.token;

  request.get({ url: url, headers: this.headers, qs: qs }, function(error, response, body) {
    if (error) { return q.reject(error); }

    parseString(body, function(error, result) {
      if (error) { return q.reject(error); }

      return q.resolve(result);
    });
  });

  return q.promise;
};

API.formatAgencyNames = function formatAgencyNames(agencyNames) {
  return agencyNames.join('|');
};

API.formatRouteIDF = function formatRouteIDF(agencyName, routeCode, routeDirectionCode) {
  return [agencyName, routeCode, routeDirectionCode]
    .filter((e) => e !== null || e !== undefined)
    .join('~');
};

API.formatRouteIDFs = function formatRouteIDFs(routeIDFs) {
  return routeIDFs
    .map((e) => API.formatRouteIDF.apply(this, e))
    .join('|');
};
