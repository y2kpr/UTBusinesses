SearchBox = React.createClass({

  handleKeyup: _.debounce(function(){
    Session.set('lastResult', initialSize);
    Session.set('searchQuery', this.refs.searchBox.getDOMNode().value);
  }, 200),

  componentDidMount() {
    $(this.refs.modalButton.getDOMNode()).leanModal();
  },

  render(){ 
    return (
      <div className="row search-area">
        <div className="input-field col s12">
          <i className="fa fa-fw fa-search prefix"></i>
          <input ref="searchBox" onKeyUp={this.handleKeyup} type="text" className="search-box"></input>
          <label>Search</label>
        </div>
        <i ref='modalButton' className="fa fa-fw fa-plus submit-new" data-target="submitModal"></i>
      </div>
    )
  }

});