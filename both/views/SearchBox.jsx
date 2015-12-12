/* globals Session */

App.SearchBox = React.createClass({

  handleKeyup: _.debounce(function () {
    Session.set('lastResult', App.initialBatchSize)
    Session.set('searchQuery', this.refs.searchBox.getDOMNode().value)
  }, 200),

  componentDidMount () {
    $(this.refs.infoButton.getDOMNode()).leanModal()
  },

  render () {
    return (
      <div className='row search-area'>
        <div className='input-field col s12'>
          <i className='fa fa-fw fa-search prefix'></i>
          <input ref='searchBox' onKeyUp={this.handleKeyup} type='text' className='search-box'></input>
          <label>Search</label>
        </div>
        <i ref='infoButton' className='fa fa-fw fa-info-circle info-button search-button' data-target='infoModal'></i>
      </div>
    )
  }

})
