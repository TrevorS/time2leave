'use strict';
module.exports = Storage;
const Q    = require('q');
const fs   = require('fs');
const path = require('path');

function Storage(app, storagePath) {
  if (storagePath !== undefined) {
    this.storagePath = storagePath;
  }
  else {
    this.storagePath = path.join(app.getPath('home'), '.time2leave.json');
  }

  this.data = null;
}

Storage.prototype._loadData = function _loadData(callback) {
  let q = Q.defer();

  fs.readFile(this.storagePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Error Loading Storage:', error);
      return q.reject(error);
    }
    this.data = JSON.parse(data);

    return q.resolve();
  });

  return q.promise;
};

Storage.prototype._saveData = function _saveData() {
  let q = Q.defer();
  fs.writeFile(this.storagePath, JSON.stringify(this.data), (error) => {
    if (error) {
      console.error('Error Saving Storage:', error);
      return q.reject(error);
    }
    return q.resolve();
  });

  return q.promise;
};

Storage.prototype.get = function get(key) {
  let q = Q.defer();

  this._loadData()
    .then(() => {
      if (this.data.hasOwnProperty(key)) {
        return q.resolve(this.data[key]);
      } else {
        return q.resolve({});
      }
    });

  return q.promise;
};

Storage.prototype.set = function set(key, value) {
  let q = Q.defer();

  this.data[key] = value;
  this._saveData().done();

  q.resolve(this);

  return q.promise;
};

Storage.prototype.unset = function unset(key) {
  let q = Q.defer();

  if (this.data.hasOwnProperty(key)) {
    q.resolve(this.data[key]);

    delete this.data[key];

    this._saveData().done();
  } else {
    q.resolve(null);
  }

  return q.promise;
};
