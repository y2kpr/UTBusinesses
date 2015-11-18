FlowRouter.route("/", { // SSR
  action() {
    name: "home",
    ReactLayout.render(DappsList, {})
  }
})