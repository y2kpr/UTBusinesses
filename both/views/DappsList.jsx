/* globals Session, ReactMeteorData */

App.initialBatchSize = 48
App.defaultSortDirection = -1 // descending sort by default
App.defaultSortType = 'last_update'

var chunkSize = 24 // must be % 12 == 0, how many blocks are added
var blocksInAdvance = 6 // if the browser is this close to the bottom we will load more

if (typeof Session !== 'undefined') {
  Session.set('searchQuery', '')
  Session.set('searchSortDirection', App.defaultSortDirection)
  Session.set('searchSortType', App.defaultSortType)
  Session.set('lastResult', App.initialBatchSize)
}

if (Meteor.isClient) {
  var $window = $(window)
}

App.BusinessesList = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  // fields in mongo to use in search query
  searchFields: ['name', 'description', 'tags', 'contact', 'status'],
  // Loads items from the Businesses collection and puts them on this.data.businesses
  getMeteorData () {
    var data = {}
    var query = {}
    var sort = {}
    sort[App.defaultSortType] = App.defaultSortDirection
    var limit = App.initialBatchSize
    var searchQuery = ''
    // subscribe to the data source, server and client
    Meteor.subscribe('businesses')
    // CLIENT ONLY
    if (typeof Session !== 'undefined') {
      // Use the search query if one exists
      searchQuery = Session.get('searchQuery') || ''
      limit = Session.get('lastResult')
      sort = {}
      sort[Session.get('searchSortType')] = Session.get('searchSortDirection')
      // the defaultSortType will always remain as a 'secondary sort'
      sort[App.defaultSortType] = Session.get('searchSortDirection')

      // If the query is long enough, search regex pattern in all searchable fields
      if (searchQuery.length > 0) {
        query = {$or: []}
        for (var i = 0; i < this.searchFields.length; i++) {
          var thisField = {}
          thisField[this.searchFields[i]] = { $regex: searchQuery, $options: 'i' }
          query.$or.push(thisField)
        }
      }
    }
    data.businesses = App.cols.Businesses.find(query, { sort: sort, limit: limit }).fetch()
    data.count = App.cols.Businesses.find(query).count()
    data.resultType = searchQuery.length > 0 ? 'found' : 'listed'
    return data
  },

  // infinite scrolling
  loadMoreItems () {
    var childCount = $('.col', this.refs.businessesection.getDOMNode()).size()
    var sessionGetLastResult = Session.get('lastResult')
    // don't try to load more items until we've matched the last request, or never fire if done
    if (childCount >= sessionGetLastResult) {
      Session.set('lastResult', sessionGetLastResult + chunkSize)
    }
  },

  handleScroll: _.debounce(function () {
    // get the position of `blocksInAdvance` blocks before it ends
    var $lastItem = $('.col:last-child', this.refs.businessesection.getDOMNode())
    var targetPosition = Math.round($lastItem.offset().top - ($lastItem.height() * blocksInAdvance))
    if ($window.scrollTop() + $window.height() >= targetPosition) {
      this.loadMoreItems()
    }
  }, 200),

  componentDidUpdate () {
    // check to see if screen is fully populated
    var $lastItem = $('.col:last-child', this.refs.businessesection.getDOMNode())
    if ($lastItem.size() && Math.floor($lastItem.offset().top) + $lastItem.height() < $window.height()) {
      this.loadMoreItems()
    }
  },

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    this.componentDidUpdate()
  },

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  },

  scrollToTop () {
    window.scrollTo(0, 0)
  },

  renderBusinesses () {
    if (this.data.businesses.length) {
      return this.data.businesses.map(business => {
          // App.Business is the name of react class
        return <App.Business
          key={business._id}
          business={business} />
      })
    } else {
      return (
        <div className='no-results center-align white-text flow-text section'>
          <p>No Businesses Found</p>
        </div>
      )
    }
  },

  render () {
    return (
      <div>
        <div onClick={this.scrollToTop} className='scroll-to-top'>
          <i className='fa fa-fw fa-arrow-up'></i>
        </div>
        <div ref='navArea' className='header-container container'>
          <header className='center-align'>
            <h1>State of UT Businesses</h1>
          </header>
          <section>
            < App.SearchBox />
          </section>
        </div>
        < App.InfoModal />

        <div className='cream'>
          <div className='row'>
            < App.FilterArea data={this.data} />
            <section ref='businessesection' className='businesses row'>
              {this.renderBusinesses()}
            </section>
          </div>
          <footer className='black-text center-align'>
            <div className='row'>
              <div className='col s12 m4'>
                Service by <a target='_blank' href='http://utlea.org/'>UT LEA</a>
              </div>
              <div className='col s12 m4'>
                UI by <a target='_blank' href='http://hitchcott.com'>Hitchcott</a>
              </div>
              {/* <div className='col s12 m4'>
              Fork me on <a target='_blank' href='https://github.com/'><i className='fa fa-fw fa-github'></i>GitHub</a>
              </div> */}
            </div>
          </footer>
        </div>

        < App.SubmitModal />
      </div>
    )
  }
})