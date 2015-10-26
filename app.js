'use strict';
const remote  = require('remote');
const app     = remote.require('app');
const API     = require('./lib/api.js');
const Storage = require('./lib/storage.js');
const config  = require('./config.json');

function populateAgencies(api, select, storage) {
  api.getAgencies()
    .then((agencies) => {
      agencies
        .forEach((agency) => {
          let option = document.createElement('option');

          option.value     = agency.name;
          option.innerHTML = agency.name;

          select.appendChild(option);
        });
    })
    .then(() => setSavedAgency(select, storage));
}

function setSavedAgency(select, storage) {
  storage.get('agencyName')
    .then((agencyName) => {
      if (agencyName !== null || agencyName !== undefined) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value === agencyName) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    });
}


window.onload = function() {
  let api     = new API(config);
  let storage = new Storage(app);

  let agencySelect = document.getElementById('agency-select');
  let submitBtn    = document.getElementById('submit-btn');
  let results      = document.getElementById('results');

  populateAgencies(api, agencySelect, storage);

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let agencyIndex = agencySelect.selectedIndex;
    let agency      = agencySelect.options[agencyIndex].value;

    storage.set('agencyName', agency)
      .then((that) => console.log(that));
  });
};
