/* globals FlowRouter, ReactLayout, Meteor */

var businesses = FlowRouter.group({
	prefix: '/businesses'
});

FlowRouter.route('/', {
  triggersEnter: [function(context, redirect) {
    redirect('/businesses');
  }],
  action: function(_params) {
    throw new Error("this should not get called");
  }
});

businesses.route('/', {
  action () {
    ReactLayout.render(App.BusinessesList, {})
  }
}),

businesses.route('/confirmbusiness/:document', {
	action: function(params, queryParams){
		console.log('document is: ', params.document);
		Meteor.call('insertBusiness', params.document);
	}
})

if (Meteor.isServer) {
  FlowRouter.setDeferScriptLoading(true);
}
