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

   // it("should set @manager for a manager", function(){
   //      myBuilding.setManager(manager);
   //      expect(myBuilding.manager).to.eql(manager);
   //    });

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
  if (this.manager !== null && tenant.references.length >= 2) {
    unit.tenant = tenant;
  }

};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  // ...
};

Building.prototype.availableUnits = function(){
  // return units available
  // ...
};

Building.prototype.rentedUnits = function(){
  // return rented units
  // ...
};

module.exports = Building;
