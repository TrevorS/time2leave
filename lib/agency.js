'use strict';

module.exports = Agency;

function Agency(name, hasDirection, mode) {
  this.name = name;
  this.hasDirection = hasDirection;
  this.mode = mode;
}

Agency.createAgencies = function createAgencies(response) {
  return response.RTT.AgencyList[0].Agency.map(
    (e) => new Agency(e.$.Name, e.$.HasDirection === 'True', e.$.Mode)
  );
};

Agency.prototype.getName = function getName() {
  return this.name;
};

Agency.prototype.hasDirection = function hasDirection() {
  return this.hasDirection;
};

Agency.prototype.getMode = function getMode() {
  return this.mode;
};
