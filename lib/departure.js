'use strict';

module.exports = Departure;

function Departure(time) {
  this.time = time;
}

Departure.createDeparturesByStopCode = function createDepartureByStopCode(response) {
  return response.RTT.AgencyList[0].Agency[0]
      .RouteList[0].Route[0].RouteDirectionList[0]
      .RouteDirection[0].StopList[0].Stop[0].DepartureTimeList[0].DepartureTime
      .map((time) => parseInt(time))
      .filter((time) => !isNaN(time))
      .map((time) => new Departure(time));
};
