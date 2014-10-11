"use strict"

function Building(address) {
  this.address = address;
  this.units = [];
  this.manager = null;
  // building has an address
  // ...
  // and array of units
  // ...
}

Building.prototype.setManager = function(person) {
  
  // set this.manager to person. Person needs to be of type Manager.
  //
  // we can't use `instanceof` here because requiring the Manager
  // class in this file would create a circular dependency. therefore,
  // we're giving you this `if` statement for free.  in most other
  // cases you can use `instanceof` to check the class of something.
  if (person.constructor.name === "Manager") {
      this.manager = person;
  }
};


Building.prototype.getManager = function(){
  // return this.manager 
  // ..
  return this.manager;
};

Building.prototype.addTenant = function(unit, tenant) {
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  // Note that tenenat does not belong to Building, but to Unit
  // ...
  if (this.manager !== null && tenant.references.length >= 2 && 
    unit.available() && this.units.indexOf(unit) !== -1) {
    unit.tenant = tenant;

  }

};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  // ...
  if (this.manager !== null && this.units.indexOf(unit) !== -1 && unit.tenant === tenant) {
    unit.tenant = null;
  }
};
// available units is a function, when called it returns this filter. in order to get everything out of the inner and outer function, we need two returns. the outer function returns the result of the inner function. the inner needs to return data to the outer. and the outer needs to return data to the entire function
 //filter filters out only truthy things and places it in a new array 
Building.prototype.availableUnits = function(){
  // return units available
  // ...
  return this.units.filter(function (unit){
    return unit.available();
  });
};


Building.prototype.rentedUnits = function(){
  return this.units.filter(function (unit){
    return !unit.available();
  });
};

module.exports = Building;
