Dapps = new Mongo.Collection('dapps');

if (Meteor.isServer) {
  Meteor.publish("dapps", function () {
    // TODO limit this to infinite scroll data
    return Dapps.find({});
  });
}