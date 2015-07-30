Dapps = new Mongo.Collection('dapps');

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
      title: "URL",
      tmpl: Meteor.isClient && Template.dappUrlCell
    },
    {data: "contact", title: "Contact"},
    //{data: "tags", title: "Tags"},
    {data: "license", title: "License"},
    {data: "platform", title: "Platform"},
    {data: "status", title: "Status"},
    {data: "last_update", title: "Last&nbsp;Update"},
  ],
  language: {
    emptyTable: "Loading..."
  },
  order: [[6, 'desc'], [7, 'desc']],
  pageLength: 100
});
