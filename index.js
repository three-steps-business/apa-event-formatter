'use strict';

const _ = require('lodash')

exports.handler = async (event) => {
  const lineItems = event.line_items
  const orderMetaData = event.meta_data
  const eventArray= []

  lineItems.forEach(function(element, index) {
     const eventObj = {}
     eventObj.id = index + 1
     eventObj.person_count = element.quantity
     eventObj.data = element
     eventArray.push(eventObj)
  })

  eventArray.forEach(function(element, index) {
      element.persons = []
      for (var i = 0; i < element.person_count; i++) {
          const personObj = {}
          const paxCount = i + 1
          const findString = 'Event ' + element.id + ' Person ' +  paxCount
          personObj.searchString = findString
          personObj.email = _.find(orderMetaData, function(o) { return o.key == findString + ' Email'; }).value
          personObj.first_name = _.find(orderMetaData, function(o) { return o.key == findString + ' First Name'; }).value
          personObj.last_name = _.find(orderMetaData, function(o) { return o.key == findString + ' Last Name'; }).value
          personObj.dietary_requirements = _.find(orderMetaData, function(o) { return o.key == findString + ' Dietary Requirements'; }).value
          personObj.number_of_employees = _.find(orderMetaData, function(o) { return o.key == findString + ' Number of Employees'; }).value
          personObj.current_payroll_system = _.find(orderMetaData, function(o) { return o.key == findString + ' Current Payroll System'; }).value
          personObj.time_and_attendance = _.find(orderMetaData, function(o) { return o.key == findString + ' Time and Attendance'; }).value
          element.persons.push(personObj)
      }
  })

  const response = {
      statusCode: 200,
      body: eventArray
  };
  return response;
};
