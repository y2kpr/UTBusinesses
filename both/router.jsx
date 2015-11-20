FlowRouter.route("/", { // SSR
  action() {
    name: "home",
    ReactLayout.render(DappsList, {})
  }
});

if(Meteor.isServer){
  FlowRouter.setDeferScriptLoading(true);
};