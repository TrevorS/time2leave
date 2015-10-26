'use strict';
module.exports = Stop;

function Stop(code, name) {
  this.code = code;
  this.name = name;
}

Stop.createStops = function createStops(response) {
  return response.RTT.AgencyList[0].Agency[0]
    .RouteList[0].Route[0].RouteDirectionList[0]
    .RouteDirection[0].StopList[0].Stop
    .map((stop) => new Stop(stop.$.StopCode, stop.$.name));
};
