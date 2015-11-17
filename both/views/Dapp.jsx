Dapp = React.createClass({
  propTypes: {
    dapp: React.PropTypes.object.isRequired
  },

  statusColors : [
    "light-grey", // 0. Unknown
    "black white-text", // 1. Abandoned
    "red darken-2 white-text", // 2. On Hold
    "grey darken-2 white-text", // 3. Stealth Mode
    "amber accent-1", // 4. Concept
    "amber", // 5. Work In Progress
    "green accent-1", // 6. Demo
    "green accent-2", // 7. Working Prototype
    "green accent-3" // 8. live
  ],

  render() {
    var statusColor = this.statusColors[parseInt(this.props.dapp.status[0])]
    var link = this.props.dapp.url || this.props.dapp.github || this.props.dapp.reddit;
    return (
      <div className="col s12 m4 l3">
        <div className="card dapp-card">
          <div className="card-content">
            <div className="center-align">
              <div className="card-title truncate">
                {link ?
                  <a target="_blank" href={link}>
                    {this.props.dapp.name}
                  </a>
                : this.props.dapp.name}
              </div>
              <div className="card-subtitle trunchate">{this.props.dapp.contact}</div>
              <p>{this.props.dapp.description}</p>
            </div>
            <div className='section status-section'>
              <div className="pull-right">
                <p>
                  {this.props.dapp.github ?
                    <a target="_blank" href={this.props.dapp.github}>
                      <small>{this.props.dapp.license}</small>
                      <i className="icon-link fa fa-fw fa-github"></i>
                    </a>
                  : <small>{this.props.dapp.license}</small>}
                </p>
              </div>
              <p>
                <div className={"slim-chip chip truncate " + statusColor}>
                  {this.props.dapp.last_update + " "}
                  <b>{this.props.dapp.status.substring(3)}</b>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
