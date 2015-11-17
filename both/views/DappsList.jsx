FlowRouter.route("/", { // SSR
  action() {
    name: "home",
    ReactLayout.render(DappsList, {})
  }
})

Meteor.startup(function(){
  if (typeof Session != 'undefined') {
    Session.set('searchQuery', '')
  }
})

// Dapps component - represents the whole app at the moment
DappsList = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  searchFields: ["name", "description", "tags", "contact"],

  // Loads items from the Dapps collection and puts them on this.data.dapps
  getMeteorData() {
    var handle = Meteor.subscribe('dapps');
    var data = {};
    var query = {};
    var sort = {'last_update': -1};
    var searchQuery = "";
    // if server, render all by default
    if (typeof Session != 'undefined') {
      // but on the client use the search query
      searchQuery = Session.get('searchQuery') || "";
      // if the query is long enough, search regex pattern in all searchable fields
      if(searchQuery.length > 0){
        query = {$or:[]}
        for (var i = 0; i < this.searchFields.length; i++) {
          var thisField = {}
          thisField[this.searchFields[i]] = { $regex: searchQuery, $options: "i" };
          query.$or.push(thisField);
        };
      };
    };

    if(handle.ready()) {
      data.dapps = Dapps.find(query, { sort: sort }).fetch();
    }
    return data;
  },

  // update client side query on keyup
  handleKeyup: _.debounce(function(){
    Session.set('searchQuery', this.refs.searchBox.getDOMNode().value);
  }, 200),

  renderDapps() {
    // Get dapps from this.data.dapps, map the key
    return this.data.dapps.map((dapp) => {
      return <Dapp
        key={dapp._id}
        dapp={dapp} />;
    });
  },

  // TODO move search box into it's own component
  render() {
    return (
      <div>
        <div className="container">
          <header className="center-align">
            <h1>State of the Dapps</h1>
          </header>
          <section>
            <div className="row">
              <div className="input-field col s12">
                <i className="fa fa-fw fa-search prefix"></i>
                <input ref="searchBox" onKeyUp={this.handleKeyup} type="text" className="search-box"></input>
                <label>Search</label>
              </div>
            </div>
          </section>
        </div>
        <main className="dapps section row">
          {this.renderDapps()}
        </main>
      </div>
    );
  }
});

