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
      business_name: ShortString,
      description: ShortString,
      contact: ShortString,
      contact_email: ShortString,
      site: ShortString,
      reddit: ShortString,
      github: ShortString,
      license: ShortString,
      tags: ShortString,
      status: ShortString
    })

    data.timestamp = new Date().toLocaleString()

    if (Meteor.isServer) {
      Email.send({
        to: process.env.MAIL_TO,
        from: process.env.MAIL_FROM,
        replyTo: data.contact_email,
        subject: `New Business Submitted - ${data.business_name}`,
        text: `Business needs to be approved and added manually:\n\n ${EJSON.stringify(data, null, 2)}`
      })
    }
  }
})
