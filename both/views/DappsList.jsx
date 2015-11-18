chunkSize = 36; // this % 12 == 0
var blocksInAdvance = 6; // if the browser is this close to the bottom we will load more

if (typeof Session != 'undefined') {
  Session.set('searchQuery', '')
  Session.set('lastResult', chunkSize)
}

if(Meteor.isClient){
  var $window = $(window)
}

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
    var limit = chunkSize;
    var searchQuery = "";
    // if server, render all by default
    if (typeof Session != 'undefined') {
      // but on the client use the search query
      searchQuery = Session.get('searchQuery') || "";
      limit = Session.get('lastResult')
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

    data.dapps = Dapps.find(query, { sort: sort, limit: limit }).fetch();

    return data;
  },

  // infinite scrolling
  loadMoreItems() {
    var childCount = $('.col', this.refs.dappSection.getDOMNode()).size()
    // make sure all items are loaded
    var sessionGetLastResult = Session.get('lastResult');
    if(childCount >= sessionGetLastResult){
      Session.set('lastResult', sessionGetLastResult + chunkSize);
    }
  },

  handleScroll: _.debounce(function(){
    var $lastItem = $('.col:last-child', this.refs.dappSection.getDOMNode());
    // get the position of `blocksInAdvance` blocks before it ends
    var targetPosition = Math.round($lastItem.offset().top - ($lastItem.height() * blocksInAdvance));
    if($window.scrollTop() + $window.height() >= targetPosition) {
      this.loadMoreItems()
    };
  }, 200),

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  renderDapps() {
    // Get dapps from this.data.dapps, map the key
    return this.data.dapps.map((dapp) => {
      return <Dapp
        key={dapp._id}
        dapp={dapp} />;
    });
  },

  render() {
    return (
      <div>
        <div ref='navArea' className="header-container container">
          <header className="center-align">
            <h1>State of the Ðapps</h1>
          </header>
          <section>
            <SearchBox />
          </section>
        </div>
        <main ref='dappSection' className="dapps section row">
          {this.renderDapps()}
        </main>
      </div>
    );
  }
});

