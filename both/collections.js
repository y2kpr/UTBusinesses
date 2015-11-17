Dapps = new Mongo.Collection('dapps');

if (Meteor.isServer) {
  Meteor.publish("dapps", function () {
    return Dapps.find({});
  });
}