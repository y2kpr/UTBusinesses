Dapps = new Mongo.Collection('dapps');

TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Dapps = new Tabular.Table({
  name: "DappList",
  collection: Dapps,
  columns: [
    {data: "name", title: "Name"},
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
    {data: "last_update", title: "Last Update"},
  ],
  pageLength: 25,
  order: [[ 6, 'desc' ]]
});
