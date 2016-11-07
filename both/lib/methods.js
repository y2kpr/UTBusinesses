/* globals check, Match, Email, EJSON */

Meteor.methods({
  newSubmission: function (data) {
    // validate the data before emailing it out
    // TODO rate limit?
    var ShortString = Match.Where(function (x) {
      check(x, String)
      return x.length <= 128
    })

    check(data, {
      name: ShortString,
      description: ShortString,
      contact_name: ShortString,
      contact: ShortString,
      url: ShortString,
      logo: ShortString,
      founder: ShortString,
      founding_date: ShortString,
      tags: ShortString,
      product_status: ShortString,
      funding_status: ShortString,
      hiring_status: ShortString
    })

    if (Meteor.isServer) {
      var stringData = EJSON.stringify(data, null, 2);
      var link = process.env.BASE_URL + '/businesses/confirmbusiness/' + encodeURIComponent(stringData);
      Email.send({
        to: process.env.MAIL_TO,
        from: process.env.MAIL_FROM,
        replyTo: data.contact_email,
        subject: `New Business Submitted - ${data.name}`,
        text: `Business needs to be approved and added manually:\n\n ${stringData}\n\n Click this link to approve: ${link}`
      })
    }
  },

  insertBusiness: function(document) {
    var data = EJSON.parse(document);

    // Validate data before inserting it
    var ShortString = Match.Where(function (x) {
      check(x, String)
      return x.length <= 128
    })
    check(data, {
      name: ShortString,
      description: ShortString,
      contact_name: ShortString,
      contact: ShortString,
      url: ShortString,
      logo: ShortString,
      founder: ShortString,
      founding_date: ShortString,
      tags: ShortString,
      product_status: ShortString,
      funding_status: ShortString,
      hiring_status: ShortString
    })

    if (Meteor.isServer){
      App.cols.Businesses.insert(data);
    }
  }
})
