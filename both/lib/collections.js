/* globals Mongo */
this.App = {}

App.cols = {
  Businesses: new Mongo.Collection('businesses')
}

if (Meteor.isServer) {
  Meteor.publish('businesses', function () {
    // TODO limit this to infinite scroll data
    return App.cols.Businesses.find({})
  })
}
