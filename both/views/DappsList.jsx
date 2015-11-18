chunkSize = 24; // this % 12 == 0
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
    var sessionGetLastResult = Session.get('lastResult');
    // don't try to load more items until we've matched the last request
    if(childCount >= sessionGetLastResult){
      Session.set('lastResult', sessionGetLastResult + chunkSize);
    }
  },

  handleScroll: _.debounce(function(){
    // get the position of `blocksInAdvance` blocks before it ends
    var $lastItem = $('.col:last-child', this.refs.dappSection.getDOMNode());
    var targetPosition = Math.round($lastItem.offset().top - ($lastItem.height() * blocksInAdvance));
    var windowHeight = $window.height();
    if($window.scrollTop() + $window.height() >= targetPosition) {
      this.loadMoreItems();
    };
  }, 200),

  componentDidUpdate() {
    // check to see if screen is fully populated
    var $lastItem = $('.col:last-child', this.refs.dappSection.getDOMNode());
    if(Math.floor($lastItem.offset().top) + $lastItem.height() < $window.height()){
      this.loadMoreItems()
    }
  },

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.componentDidUpdate()
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  scrollToTop() {
    window.scrollTo(0, 0);
  },

  renderDapps() {
    // Get dapps from this.data.dapps, map the key
    return this.data.dapps.map((dapp) => {
      return <Dapp
        key={dapp._id}
        dapp={dapp} />;
    });
  },

  renderModal() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    )
  },

  render() {
    return (
      <div>
        <div onClick={this.scrollToTop} className='scroll-to-top'>
          <i className='fa fa-fw fa-arrow-up'></i>
        </div>
        {this.renderModal()}
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

