Meteor.methods({
  "newSubmission": function(data){

    // validate the data before emailing it out
    // TODO rate limit?
    var ShortString = Match.Where(function (x) {
      check(x, String);
      return x.length <= 128;
    });

    check(data, {
      dapp_name: ShortString,
      description: ShortString,
      contact: ShortString,
      contact_email: ShortString,
      site: ShortString,
      reddit: ShortString,
      github: ShortString,
      license: ShortString,
      tags: ShortString,
      status: ShortString
    });

    data.timestamp = new Date();

    if(Meteor.isServer){
      Email.send({
        to: process.env.MAIL_TO,
        from: process.env.MAIL_FROM,
        subject: "New Dapp Submitted - " + data.dapp_name,
        text: "Dapp needs to be approved and added manually:\n\n" + EJSON.stringify(data,null,2)
      });
    }
  }
})