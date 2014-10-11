"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
// var building refers to an instance of building named Waterfront Tower
var people = [];


people.push(new app.Person("Anna", "765-4321"));
var john = new app.Manager("John", "700-4321");
building.setManager(john);
people.push(john);
var devin = new app.Tenant("Devin", "765-1234");
devin.addReference(new app.Person("Carl", "415 3536 222"));
devin.addReference(new app.Person("Steve", "415 1111 222"));
people.push(devin);
people.push(new app.Tenant("Steve", "744-1234"));

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager',
 //Add manager is a string (first parameter)
 // second parameter is a callback which takes in a function.
 // third item is a null (third parameter)
 // fourth item is an array of objects (fourth parameter)
 // none of these items do anything until they are called in node with one of the number functions.
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    // we create a new instance of a manager called app.manager
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        // we want to see if people(an object) is an instance of app.Tenant(a function) this tells us if people is a tenant
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        // var references is equal to whatever person we're looking at
        if(!references) {continue;}
        // above line is confusing and not explained
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }  
);

menu.addItem('(implement me) Show available units', 
  function() {
      console.log("Implement me");
      var emptyUnits = building.availableUnits();
     for (var i = 0; i < emptyUnits.length; i++){
        console.log(" tenant: " + building.units[i].tenant +
              " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
     }
   }
);

menu.addItem('(implement me) Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
      console.log("Implement me. Show error if tenant is unknown. Note: a reference is a person");
      var reference = new app.Person(ref_name, ref_contact);

      // If the tenant name entered in console is equal to the tenant.name that is inside the array and is also considered an instance of the tenant class, then we have the right person.
      // We want to add references to the tenant.references array. In order to do so we need to check the people's array and see inside if there's a match of what we enter )tenant_name and what's inside tenant.name.
      people.forEach(function(tenant){
        // on the top of the page we created tenants that are being pushed into people array. if the person is a tenant, you can push references inside of him.
        if (tenant.name === tenant_name && tenant instanceof app.Tenant){
          tenant.references.push(reference);
        }
      });
    

    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);

menu.addItem('(implement me) Move tenant in unit', 
  function(unit_number, tenant_name) {
      // find tenant and unit objects, use building's addTenant() function.
      console.log("Implement me.");
    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Evict tenant', 
  function(tenant_name) {
      // Similar to above, use building's removeTenant() function.
      console.log("Implement me");
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Show total sqft rented', 
  function() {


    
      console.log("Implement me");
    } 
);

menu.addItem('(implement me) Show total yearly income', 
  function() {
      // Note: only rented units produce income
      console.log("Implement me.");
    } 
);

menu.addItem('(Add your own feature ...)', 
  function() {
      console.log("Implement a feature that you find is useful");
    } 
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();