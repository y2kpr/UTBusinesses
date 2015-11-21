/* globals Mongo */
this.App = {}

App.cols = {
  Dapps: new Mongo.Collection('dapps')
}

if (Meteor.isServer) {
  Meteor.publish('dapps', function () {
    // TODO limit this to infinite scroll data
    return App.cols.Dapps.find({})
  })
}
