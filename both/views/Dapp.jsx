App.Dapp = React.createClass({
  propTypes: {
    dapp: React.PropTypes.object.isRequired
  },
  statusColors: [
    'light-grey', // 0. Unknown
    'black white-text', // 1. Abandoned
    'red darken-2 white-text', // 2. On Hold
    'grey darken-2 white-text', // 3. Stealth Mode
    'amber accent-1', // 4. Concept
    'amber', // 5. Work In Progress
    'green accent-1', // 6. Demo
    'green accent-2', // 7. Working Prototype
    'light-green accent-3' // 8. live
  ],

  render () {
    var statusColor = this.statusColors[parseInt(this.props.dapp.status[0], 10)]
    var link = this.props.dapp.url || this.props.dapp.github || this.props.dapp.reddit
    return (
      <div className='col ms12 m4 l3 xl2 xxl1'>
        <div className={'card hoverable dapp-card ' + statusColor}>
          <div className='card-content'>
            <div className='main-section center-align'>
              <div className='card-title truncate'>
                {link ? <a target='_blank' href={link}>{this.props.dapp.name}</a>
                : this.props.dapp.name}
              </div>
              <div className='card-subtitle trunchate'>
                {this.props.dapp.contact}
              </div>
              <div className='card-description'>
                <p>{this.props.dapp.description}</p>
              </div>
            </div>
            <div className='section status-section'>
              <p className='icon-row center-align'>
                { this.props.dapp.github &&
                  <a target='_blank' href={this.props.dapp.github}>
                    {this.props.dapp.license}
                    <i className='icon-link fa fa-fw fa-github'></i>
                  </a>
                }
                { this.props.dapp.reddit &&
                  <a target='_blank' href={this.props.dapp.reddit}>
                    <i className='icon-link fa fa-fw fa-reddit'></i>
                  </a>
                }
              </p>
              <p className='pull-right'>
                  {this.props.dapp.last_update}
              </p>
              <p>
                {this.props.dapp.status.substring(3)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
