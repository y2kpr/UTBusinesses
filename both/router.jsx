/* globals FlowRouter, ReactLayout */

FlowRouter.route('/', {
  action () {
    ReactLayout.render(App.BusinessesList, {})
  }
})

if (Meteor.isServer) {
  FlowRouter.setDeferScriptLoading(true)
}
