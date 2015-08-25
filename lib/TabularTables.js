Dapps = new Mongo.Collection('dapps');
Dapps.helpers({
  link: function() {
    return this.url || this.github || this.reddit;
  }
});
TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Dapps = new Tabular.Table({
  autoWidth: false,
  name: "DappList",
  collection: Dapps,
  columns: [
    {data: "name", title: "DAPP&nbsp;Name"},
    {data: "description", title: "Description"},
    {
      data: "url",
      title: "Link",
      tmpl: Meteor.isClient && Template.dappLinkCell
    },
    {data: "contact", title: "Contact"},
    {data: "tags", title: "Tags"},
    {data: "license", title: "License"},
    {data: "status", title: "Status"},
    {data: "last_update", title: "Last&nbsp;Update"},
  ],
  columnDefs: [ { targets: 2, orderable: false, width: "70px" } ],
  extraFields: ['github', 'reddit'],
  language: {
    emptyTable: "Loading..."
  },
  order: [[7, 'desc']],
  pageLength: 100
});
