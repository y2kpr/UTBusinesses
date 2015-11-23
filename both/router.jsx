/* globals FlowRouter, ReactLayout */

FlowRouter.route('/', {
  action () {
    ReactLayout.render(App.DappsList, {})
  }
})

if (Meteor.isServer) {
  FlowRouter.setDeferScriptLoading(true)
}
